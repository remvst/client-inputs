export class GamepadButton {
    static A = 0;
    static B = 1;
    static X = 2;
    static Y = 3;
    static L1 = 4;
    static R1 = 5;
    static L2 = 6;
    static R2 = 7;
    static SELECT = 8;
    static START = 9;
    static L3 = 10;
    static R3 = 11;
    static DPAD_UP = 12;
    static DPAD_DOWN = 13;
    static DPAD_LEFT = 14;
    static DPAD_RIGHT = 15;

    static labelFor(button: number) {
        const [key] =
            Object.entries(GamepadButton).find(
                ([_, value]) => value === button,
            ) || [];
        return key || `GAMEPAD_${button}`;
    }
}

export enum GamepadAxis {
    LEFT_X = 0,
    LEFT_Y = 1,
    RIGHT_X = 2,
    RIGHT_Y = 3,
}
