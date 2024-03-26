import { Keyboard } from "./keyboard";
import KeyboardInputs from "./keyboard-inputs";

export class DOMKeyboardInputs extends KeyboardInputs {
    private lastEvent: Event | null = null;

    setup() {
        window.addEventListener("keydown", this.keyDown.bind(this), false);
        window.addEventListener("keyup", this.keyUp.bind(this), false);
        window.addEventListener("blur", this.reset.bind(this), false);
    }

    private get isFocusedOnFormElement(): boolean {
        const { activeElement } = document;
        if (!activeElement) return false;

        if (activeElement.tagName.toLowerCase() === "input") {
            if (
                activeElement.getAttribute("type") === "text" ||
                activeElement.getAttribute("type") === "number"
            ) {
                return true;
            }
        }

        return false;
    }

    keyDown(e: KeyboardEvent) {
        this.lastEvent = e;

        if (this.isFocusedOnFormElement) {
            return;
        }

        // Just in case, prevent scrolling with arrow keys
        if (
            e.keyCode === Keyboard.UP ||
            e.keyCode === Keyboard.DOWN ||
            e.keyCode === Keyboard.TAB ||
            e.keyCode === Keyboard.SPACE
        ) {
            e.preventDefault();
        }

        this.setDown(e.keyCode, true);
    }

    keyUp(e: KeyboardEvent) {
        this.lastEvent = e;

        if (this.isFocusedOnFormElement) {
            return;
        }

        this.setDown(e.keyCode, false);
    }

    preventDefault(): void {
        this.lastEvent?.preventDefault();
    }
}
