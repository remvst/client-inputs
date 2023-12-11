import GamepadInputs from "./gamepad/gamepad-inputs";
import { Binding, KeyboardBind, MouseButtonBind, GamepadButtonBind, MultiBind, BindingSet, WheelYBind } from "./key-bindings";
import KeyboardInputs from "./keyboard/keyboard-inputs";
import MouseInputs from "./mouse/mouse-inputs";

export interface Inputs {
    readonly keyboard: KeyboardInputs;
    readonly mouse: MouseInputs;
    readonly gamepad: GamepadInputs;
}

export function isBindingDown(
    inputs: Inputs, 
    binding: Binding | null,
): boolean {
    const { keyboard, mouse, gamepad } = inputs;

    if (binding instanceof KeyboardBind && keyboard.isDown(binding.keyCode)) {
        return true;
    }

    if (binding instanceof MouseButtonBind && mouse.isDown(binding.button)) {
        return true;
    }

    if (binding instanceof GamepadButtonBind && gamepad.isDown(binding.button)) {
        return true;
    }

    if (binding instanceof MultiBind) {
        const allowedKeys = new Set<number>();

        // Make sure all the necessary keys and buttons are down
        for (const subBinding of binding.bindings) {
            if (!isBindingDown(inputs, subBinding)) {
                return false;
            }

            if (subBinding instanceof KeyboardBind) {
                allowedKeys.add(subBinding.keyCode);
            }
        }

        // Make sure nothing else is pressed
        for (const downKey of keyboard.downKeys) {
            if (!allowedKeys.has(downKey)) {
                return false;
            }
        }

        return true;
    }

    return false;
}

export function isDown(
    inputs: Inputs, 
    bindingSet: BindingSet | null,
): boolean {
    if (!bindingSet) return false;

    for (const binding of bindingSet.bindings) {
        if (isBindingDown(inputs, binding)) {
            return true;
        }
    }

    return false;
}

export function keyCodeMatches(
    keyCode: number, 
    bindingSet: BindingSet | null,
): boolean {
    if (!bindingSet) return false;

    for (const binding of bindingSet.bindings) {
        if (binding instanceof KeyboardBind && keyCode === binding.keyCode) {
            return true;
        }
    }

    return false;
}

export function wheelMatches(
    deltaX: number, 
    deltaY: number, 
    deltaZ: number, 
    bindingSet: BindingSet | null,
): boolean {
    if (!bindingSet) return false;

    for (const binding of bindingSet.bindings) {
        if (binding instanceof WheelYBind && Math.sign(deltaY) === binding.sign) {
            return true;
        }
    }

    return false;
}

export function gamepadButtonMatches(
    button: number, 
    bindingSet: BindingSet | null,
): boolean {
    if (!bindingSet) return false;

    for (const binding of bindingSet.bindings) {
        if (binding instanceof GamepadButtonBind && button === binding.button) {
            return true;
        }
    }

    return false;
}
