export class Notification {
    _selectors = {
        notificationElement: '[data-js-notification]',
    }

    constructor() {
        document.addEventListener('notify', ({ detail }) => this._showNotification(detail));
    }

    _showNotification(message) {
        const notificationElement = document.querySelector(this._selectors.notificationElement);
        notificationElement.textContent = message;
        notificationElement.classList.add('shown');
        
        setTimeout(() => this._hideNotification(), 2000);
    }

    _hideNotification() {
        const notificationElement = document.querySelector(this._selectors.notificationElement);
        notificationElement.classList.remove('shown');
        
        notificationElement.addEventListener(
            'transitionend',
            function() {
                notificationElement.textContent = '';
            },
            { once: true }
        );
    }
}