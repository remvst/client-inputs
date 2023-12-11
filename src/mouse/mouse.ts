export class MouseButton {
    static LEFT_BUTTON = 0;
    static MIDDLE_BUTTON = 1;
    static RIGHT_BUTTON = 2;

    static labelFor(button: number) {
        if (button === this.LEFT_BUTTON) return 'MOUSE_LEFT';
        if (button === this.RIGHT_BUTTON) return 'MOUSE_RIGHT';
        if (button === this.MIDDLE_BUTTON) return 'MOUSE_WHEEL';
        return `MOUSE_BUTTON_${button}`;
    }
}
