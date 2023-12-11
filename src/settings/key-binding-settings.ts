import { BindingSet } from "../key-bindings";
import { KeyBindingsSettingsJson, BindingSetJson } from "../serialization/schema";
import { serializeBindingSet, deserializeBindingSet } from "../serialization/serialization";
import { BindingDefinitionSet } from "./binding-definition-set";

export class KeyBindingsSettings {

    readonly bindings: Map<string, BindingSet> = new Map();

    constructor(readonly definitionSet: BindingDefinitionSet) {
        this.backfillWithDefaults();
    }

    private backfillWithDefaults() {
        for (const definition of this.definitionSet.definitions) {
            if (!this.bindings.has(definition.key)) {
                this.bindings.set(definition.key, definition.defaults.clone());
            }
        }
    }

    restoreDefaults(gamepad: boolean) {
        for (const definition of this.definitionSet.definitions) {
            this.binding(definition.key).clear(gamepad);

            const defaults = definition.defaults.clone().bindings.slice(0)
                .filter(binding => binding.isGamepadBinding === gamepad);
            for (const binding of defaults) {
                this.binding(definition.key).add(binding)
            }
        }
    }

    binding(key: string): BindingSet {
        return this.bindings.get(key) || new BindingSet([]);
    }

    toJson(): KeyBindingsSettingsJson {
        const bindings: {[key: string]: BindingSetJson} = {};

        for (const [key, bindingSet] of this.bindings.entries()) {
            bindings[key] = serializeBindingSet(bindingSet);
        }

        return { bindings };
    }

    importJson(json: KeyBindingsSettingsJson) {
        // Clear everything
        this.bindings.clear();
        for (const definition of this.definitionSet.definitions) {
            this.bindings.set(definition.key, new BindingSet([]));
        }

        // Import what's in the JSON
        for (const [key, bindingSetJson] of Object.entries(json.bindings)) {
            for (const binding of deserializeBindingSet(bindingSetJson).bindings) {
                this.bindings.get(key)?.add(binding);
            }
        }
    }
}
