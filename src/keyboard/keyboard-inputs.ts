export default class KeyboardInputs {
    readonly downKeys: Set<number>;

    onKeyDown: (keyCode: number) => void = () => {};
    onKeyUp: (keyCode: number) => void = () => {};

    constructor() {
        this.downKeys = new Set();
    }

    setup() {
    }

    isDown(key: number) {
        return this.downKeys.has(key);
    }

    reset() {
        this.downKeys.clear();
    }

    import(other: KeyboardInputs) {
        this.downKeys.clear();
        other.downKeys.forEach((keyCode) => {
            this.downKeys.add(keyCode);
        });
    }

    setDown(keyCode: number, down: boolean) {
        if (down === this.isDown(keyCode)) {
            return;
        }

        if (down) {
            this.downKeys.add(keyCode);
            this.onKeyDown(keyCode);
        } else {
            this.downKeys.delete(keyCode);
            this.onKeyUp(keyCode);
        }
    }
};
