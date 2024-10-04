const PREFERENCE_QUERY = '(prefers-color-scheme: dark)';

function toggleDark() {
    const rootElement = document.documentElement;
    rootElement.classList.add('dark');
    localStorage.setItem('colorScheme', 'dark');
}

function setSystemTheme() {
    if (window.matchMedia && window.matchMedia(PREFERENCE_QUERY).matches)
        toggleDark();
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
        toggleDark();
    }
}

setInitialTheme();