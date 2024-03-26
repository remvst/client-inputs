import { GamepadAxis } from "./gamepad";

export default class GamepadInputs {
    private readonly downButtons: Set<number> = new Set();
    private readonly axes = new Map<number, number>();

    isActive = false;

    onButtonDown: (button: number) => void = () => {};
    onButtonUp: (button: number) => void = () => {};
    onAxisUpdated: (axis: number, value: number) => void = () => {};
    onAxisEngaged: (axis: number, value: number) => void = () => {};

    setup() {}

    isDown(button: number) {
        return this.downButtons.has(button);
    }

    reset() {
        this.downButtons.clear();
        this.axes.clear();
    }

    import(other: GamepadInputs) {
        this.isActive = other.isActive;
        this.downButtons.clear();
        other.downButtons.forEach((button) => {
            this.downButtons.add(button);
        });
        for (const [axis, value] of other.axes.entries()) {
            this.axes.set(axis, value);
        }
    }

    setDown(button: number, down: boolean) {
        this.isActive = true;

        if (down === this.isDown(button)) {
            return;
        }

        if (down) {
            this.downButtons.add(button);
            this.onButtonDown(button);
        } else {
            this.downButtons.delete(button);
            this.onButtonUp(button);
        }
    }

    setAxis(axis: number, value: number) {
        if (Math.abs(value) > 0.1) {
            this.isActive = true;
        }

        const wasActive = Math.abs(this.axes.get(axis) || 0) > 0.7;
        const isActive = Math.abs(value) > 0.7;

        this.axes.set(axis, value);
        if (isActive && !wasActive) {
            this.onAxisEngaged(axis, value);
        }

        this.onAxisUpdated(axis, value);
    }

    axis(axis: number): number {
        return this.axes.get(axis) || 0;
    }

    leftJoystick(): [number, number] {
        const x = this.axis(GamepadAxis.LEFT_X);
        const y = this.axis(GamepadAxis.LEFT_Y);
        const angle = Math.atan2(y, x);
        const force = Math.hypot(x, y);
        return [angle, force];
    }

    rightJoystick(): [number, number] {
        const x = this.axis(GamepadAxis.RIGHT_X);
        const y = this.axis(GamepadAxis.RIGHT_Y);
        const angle = Math.atan2(y, x);
        const force = Math.hypot(x, y);
        return [angle, force];
    }
}
