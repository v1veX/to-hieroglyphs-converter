export class ThemeToggler {
    _selectors = {
        themeButton: '[data-js-theme-button]',
    }

    constructor() {
        const themeButtonElement = document.querySelector(this._selectors.themeButton);
        themeButtonElement.onclick = this._toggleTheme;
    }

    _toggleTheme() {
        const rootElement = document.documentElement;
        rootElement.classList.toggle('dark');
        localStorage.setItem(
            'colorScheme',
            rootElement.classList.contains('dark') ? 'dark' : 'light'
        );
    }
}