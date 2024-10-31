export class ScrollToggler {
    constructor() {
        this._bindEvents();
    }

    _togglePageScroll() {
        document.body.classList.toggle('scroll-blocked');
    }

    _bindEvents() {
        document.addEventListener('toggle-scroll', () => this._togglePageScroll());
    }
}