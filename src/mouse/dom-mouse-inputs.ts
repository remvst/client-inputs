import MouseInputs from "./mouse-inputs";

export class DOMMouseInputs extends MouseInputs {
    readonly pagePosition = { x: 0, y: 0 };

    private lastEvent: Event | null = null;

    constructor(
        private readonly container: HTMLElement,
        private readonly size: { width: number; height: number },
    ) {
        super();
    }

    setup() {
        document.body.addEventListener(
            "mousedown",
            this.mouseDown.bind(this),
            false,
        );
        document.body.addEventListener(
            "mousemove",
            this.mouseMove.bind(this),
            false,
        );
        document.body.addEventListener(
            "mouseup",
            this.mouseUp.bind(this),
            false,
        );
        document.body.addEventListener(
            "contextmenu",
            this.contextMenu.bind(this),
            false,
        );
        document.body.addEventListener("wheel", this.wheel.bind(this), {
            passive: false,
        });
    }

    private contextMenu(e: MouseEvent) {
        this.lastEvent = e;
        e.preventDefault();
    }

    private mouseDown(e: MouseEvent) {
        this.lastEvent = e;
        this.setButtonDown(e.button, true);
    }

    private get scaleX(): number {
        const rect = this.container.getBoundingClientRect();
        return (rect.right - rect.left) / this.size.width;
    }

    private get scaleY(): number {
        const rect = this.container.getBoundingClientRect();
        return (rect.bottom - rect.top) / this.size.height;
    }

    private mouseMove(e: MouseEvent) {
        this.lastEvent = e;
        const coords = this.getCoordinates(e);
        this.setMousePosition(
            coords.x,
            coords.y,
            e.movementX / this.scaleX,
            e.movementY / this.scaleY,
        );
    }

    private mouseUp(e: MouseEvent) {
        this.lastEvent = e;
        this.setButtonDown(e.button, false);
    }

    private wheel(e: WheelEvent) {
        this.lastEvent = e;
        this.onWheel(e.deltaX, e.deltaY, e.deltaZ);
    }

    private getCoordinates(e: MouseEvent) {
        this.pagePosition.x = e.pageX;
        this.pagePosition.y = e.pageY;

        const rect = this.container.getBoundingClientRect();

        return {
            x: this.size.width * ((e.pageX - rect.left) / rect.width),
            y: this.size.height * ((e.pageY - rect.top) / rect.height),
        };
    }

    preventDefault(): void {
        this.lastEvent?.preventDefault();
    }
}
