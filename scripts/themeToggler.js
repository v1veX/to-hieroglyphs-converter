function toggleTheme() {
    const rootElement = document.documentElement;
    rootElement.classList.toggle('dark');
    localStorage.setItem(
        'colorScheme',
        rootElement.classList.contains('dark') ? 'dark' : 'light'
    );
}

export function init() {
    const themeButtonElement = document.querySelector('[data-js-theme-button]');
    themeButtonElement.onclick = toggleTheme;
}