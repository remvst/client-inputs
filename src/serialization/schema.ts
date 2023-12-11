export interface KeyboardBindingJson {
    type: 'kb';
    button: number;
}

export interface MouseButtonBindingJson {
    type: 'mb';
    button: number;
}

export interface WheelYBindingJson {
    type: 'wy';
    sign: number;
}

export interface GamepadButtonBindingJson {
    type: 'gpb';
    button: number;
}

export interface MultiBindingJson {
    type: 'multi';
    bindings: KeyBindingJson[];
}

export type KeyBindingJson = KeyboardBindingJson | MouseButtonBindingJson | WheelYBindingJson | GamepadButtonBindingJson | MultiBindingJson;

export interface BindingSetJson {
    bindings: KeyBindingJson[];
}

export interface KeyBindingsSettingsJson {
    bindings: {[key: string]: BindingSetJson};
}
