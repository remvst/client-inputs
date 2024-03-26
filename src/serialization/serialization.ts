import {
    Binding,
    BindingSet,
    GamepadButtonBind,
    KeyboardBind,
    MouseButtonBind,
    MultiBind,
    WheelYBind,
} from "../key-bindings";
import { BindingSetJson, KeyBindingJson } from "./schema";

export function serializeBinding(binding: Binding): KeyBindingJson {
    if (binding instanceof KeyboardBind) {
        return { type: "kb", button: binding.keyCode };
    }

    if (binding instanceof MouseButtonBind) {
        return { type: "mb", button: binding.button };
    }

    if (binding instanceof WheelYBind) {
        return { type: "wy", sign: binding.sign };
    }

    if (binding instanceof GamepadButtonBind) {
        return { type: "gpb", button: binding.button };
    }

    if (binding instanceof MultiBind) {
        return {
            type: "multi",
            bindings: binding.bindings.map((b) => serializeBinding(b)),
        };
    }

    throw new Error();
}

export function serializeBindingSet(bindingSet: BindingSet): BindingSetJson {
    return {
        bindings: bindingSet.bindings.map(serializeBinding),
    };
}

export function deserializeBindingSet(json: BindingSetJson): BindingSet {
    return new BindingSet(json.bindings.map(deserializeBinding));
}

export function deserializeBinding(bindJson: KeyBindingJson): Binding {
    if (bindJson.type === "kb") {
        return new KeyboardBind(bindJson.button);
    }

    if (bindJson.type === "mb") {
        return new MouseButtonBind(bindJson.button);
    }

    if (bindJson.type === "wy") {
        return new WheelYBind(bindJson.sign);
    }

    if (bindJson.type === "gpb") {
        return new GamepadButtonBind(bindJson.button);
    }

    if (bindJson.type === "multi") {
        return new MultiBind(
            bindJson.bindings.map((sub) => deserializeBinding(sub)),
        );
    }

    throw new Error(JSON.stringify(bindJson));
}
