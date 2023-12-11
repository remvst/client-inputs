import GamepadInputs from "./gamepad-inputs";

export class DOMGamepadInputs extends GamepadInputs {

    private animationFrame: number | null = null;

    setup() {
        super.setup();
        this.checkButtons();
    }

    tearDown() {
        cancelAnimationFrame(this.animationFrame!);
        this.animationFrame = null;
    }

    private checkButtons() {
        if (!navigator.getGamepads) {
            console.error('Gamepads not available. Switch to HTTPS');
            return;
        }

        let hasGamepad = false;

        for (const gamepad of navigator.getGamepads()) {
            if (!gamepad) continue;
            hasGamepad = true;

            gamepad.buttons.forEach((button, index) => {
                this.setDown(index, button.pressed);
            });

            gamepad.axes.forEach((value, axis) => {
                this.setAxis(axis, value);
            });
        }

        if (!hasGamepad) {
            this.reset();
        }

        this.animationFrame = requestAnimationFrame(() => this.checkButtons());
    }
}
