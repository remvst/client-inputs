import { BindingSet } from "../key-bindings";

export class BindingDefinition {
    constructor(
        public readonly category: string,
        public readonly key: string,
        public readonly label: string,
        public readonly visible: boolean,
        public readonly defaults: BindingSet,
    ) {
        this.key = key;
        this.label = label;
        this.visible = visible;
        this.defaults = defaults;
    }
}
