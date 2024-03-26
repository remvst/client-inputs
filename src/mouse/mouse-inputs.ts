export default class MouseInputs {
    readonly position = { x: 0, y: 0 };
    private downMap = new Map<number, boolean>();

    onMouseDown: (button: number) => void = () => {};
    onMouseUp: (button: number) => void = () => {};

    onMouseRightDown: () => void = () => {};
    onMouseRightUp: () => void = () => {};

    onWheel: (deltaX: number, deltaY: number, deltaZ: number) => void =
        () => {};

    onMouseMove: (movementX: number, movementY: number) => void = () => {};

    setup() {}

    setButtonDown(button: number, down: boolean) {
        if (this.downMap.get(button) === down) {
            return;
        }

        this.downMap.set(button, down);

        if (down) {
            this.onMouseDown(button);
        } else {
            this.onMouseUp(button);
        }
    }

    setMousePosition(
        x: number,
        y: number,
        movementX: number,
        movementY: number,
    ) {
        this.position.x = x;
        this.position.y = y;

        this.onMouseMove(movementX, movementY);
    }

    import(other: MouseInputs) {
        for (const button of other.downMap.keys()) {
            this.downMap.set(button, other.downMap.get(button) || false);
        }
    }

    reset() {
        this.downMap = new Map();
    }

    isDown(button: number): boolean {
        return this.downMap.get(button) === true;
    }
}
