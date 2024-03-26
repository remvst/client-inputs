import { BindingDefinition } from "./binding-definition";

export class BindingDefinitionSet {
    private definitionsMap: Map<string, BindingDefinition> = (() => {
        const keyToDefinition = new Map<string, BindingDefinition>();
        for (const definition of this.definitions) {
            keyToDefinition.set(definition.key, definition);
        }
        return keyToDefinition;
    })();

    constructor(readonly definitions: BindingDefinition[]) {}

    definition(key: string): BindingDefinition | null {
        return this.definitionsMap.get(key) || null;
    }
}
