export class Keyboard {
    static TAB = 9;
    static ENTER = 13;
    static SHIFT = 16;
    static CTRL = 17;
    static ESC = 27;
    static SPACE = 32;
    static LEFT = 37;
    static UP = 38;
    static RIGHT = 39;
    static BACKSPACE = 8;
    static COMMAND = 224;
    static DOWN = 40;
    static DELETE = 46;
    static NUM_0 = 48;
    static NUM_1 = 49;
    static NUM_2 = 50;
    static NUM_3 = 51;
    static NUM_4 = 52;
    static NUM_5 = 53;
    static NUM_6 = 54;
    static NUM_7 = 55;
    static NUM_8 = 56;
    static NUM_9 = 57;
    static A = 65;
    static B = 66;
    static C = 67;
    static D = 68;
    static E = 69;
    static F = 70;
    static G = 71;
    static H = 72;
    static I = 73;
    static J = 74;
    static K = 75;
    static L = 76;
    static M = 77;
    static N = 78;
    static O = 79;
    static P = 80;
    static Q = 81;
    static R = 82;
    static S = 83;
    static T = 84;
    static U = 85;
    static V = 86;
    static W = 87;
    static X = 88;
    static Y = 89;
    static Z = 90;

    static labelFor(keyCode: number) {
        const [key] =
            Object.entries(Keyboard).find(([_, value]) => value === keyCode) ||
            [];
        return key || `KEYBOARD_${keyCode}`;
    }
}
