document.addEventListener('DOMContentLoaded', (event) => {
    const themeToggle = document.getElementById('themeToggle');
    const isSystemDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme
    if (isSystemDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    });
});
