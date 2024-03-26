import { GamepadButton } from "./gamepad/gamepad";
import { Keyboard } from "./keyboard/keyboard";
import { MouseButton } from "./mouse/mouse";

export interface Binding {
    readonly label: string;
    equals(other: Binding): boolean;
    readonly isGamepadBinding: boolean;
}

export class MultiBind implements Binding {
    label: string = this.bindings.map((b) => b.label).join("+");

    constructor(readonly bindings: Binding[]) {}

    get isGamepadBinding(): boolean {
        return !!this.bindings.filter((binding) => binding.isGamepadBinding)[0];
    }

    equals(other: Binding): boolean {
        if (!(other instanceof MultiBind)) {
            return false;
        }

        if (other.bindings.length !== this.bindings.length) {
            return false;
        }

        for (const binding of this.bindings) {
            const hasEquivalent =
                other.bindings.filter((otherBinding) =>
                    otherBinding.equals(binding),
                ).length > 0;
            if (!hasEquivalent) {
                return false;
            }
        }

        return true;
    }
}

export class KeyboardBind implements Binding {
    readonly label: string;

    readonly isGamepadBinding = false;

    constructor(readonly keyCode: number) {
        this.keyCode = keyCode;
        this.label = Keyboard.labelFor(keyCode);
    }

    equals(other: Binding): boolean {
        return other instanceof KeyboardBind && other.keyCode === this.keyCode;
    }
}

export class MouseButtonBind implements Binding {
    readonly button: number;
    readonly label: string;
    readonly isGamepadBinding = false;

    constructor(button: number) {
        this.button = button;
        this.label = MouseButton.labelFor(button);
    }

    equals(other: Binding): boolean {
        return other instanceof MouseButtonBind && other.button === this.button;
    }
}

export class WheelYBind implements Binding {
    readonly sign: number;
    readonly label: string;
    readonly isGamepadBinding = false;

    constructor(sign: number) {
        this.sign = sign;
        this.label = sign > 0 ? "MWHEEL UP" : "MWHEEL DOWN";
    }

    equals(other: Binding): boolean {
        return other instanceof WheelYBind && other.sign === this.sign;
    }
}

export class GamepadButtonBind implements Binding {
    readonly button: number;
    readonly label: string;
    readonly isGamepadBinding = true;

    constructor(button: number) {
        this.button = button;
        this.label = GamepadButton.labelFor(button);
    }

    equals(other: Binding): boolean {
        return (
            other instanceof GamepadButtonBind && other.button === this.button
        );
    }
}

export class BindingSet {
    bindings: Binding[];

    constructor(bindings: Binding[]) {
        this.bindings = bindings;
    }

    add(binding: Binding) {
        for (const existing of this.bindings) {
            if (existing.equals(binding)) {
                return;
            }
        }
        this.bindings.push(binding);
    }

    clear(gamepad: boolean) {
        this.bindings = this.bindings.filter(
            (binding) => binding.isGamepadBinding !== gamepad,
        );
    }

    clone(): BindingSet {
        return new BindingSet(this.bindings.slice());
    }
}

export function keyboard(keyCode: number): KeyboardBind {
    return new KeyboardBind(keyCode);
}

export function mouse(button: number): MouseButtonBind {
    return new MouseButtonBind(button);
}

export function wheelY(sign: number): WheelYBind {
    return new WheelYBind(sign);
}

export function gamepadButton(button: number): GamepadButtonBind {
    return new GamepadButtonBind(button);
}

export function multi(...bindings: Binding[]): MultiBind {
    return new MultiBind(bindings);
}

export function set(...bindings: Binding[]): BindingSet {
    return new BindingSet(bindings);
}
