export class CustomDataEvent extends CustomEvent {
    constructor(name, data) {
        super(name);
        this.data = data;
    }

    invoke() {
        document.dispatchEvent(this);
    }
}