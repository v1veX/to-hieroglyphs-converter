const PREFERENCE_QUERY = '(prefers-color-scheme: dark)';

function toggleTheme() {
    const rootElement = document.documentElement;
    rootElement.classList.toggle('dark');
    const themeButtonElement = document.querySelector('.theme-button');
    themeButtonElement.classList.toggle('dark-enabled');
    localStorage.setItem(
        'colorScheme',
        rootElement.classList.contains('dark') ? 'dark' : 'light'
    );
}

function setSystemTheme() {
    if (window.matchMedia && window.matchMedia(PREFERENCE_QUERY).matches)
        toggleTheme();
    else {
        localStorage.setItem('colorScheme', 'light');
    }
}

function setInitialTheme() {
    const savedColorScheme = localStorage.getItem('colorScheme');
    if (!savedColorScheme) {
        setSystemTheme();
    }
    else if (savedColorScheme === 'dark') {
        toggleTheme();
    }
    
    // setTimeout(() => document.documentElement.classList.remove('no-transition'), 10);
}

export function init() {
    setInitialTheme();

    const themeButtonElement = document.querySelector('.theme-button');
    themeButtonElement.onclick = toggleTheme;
}