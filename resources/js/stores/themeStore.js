import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
    persist(
        (set, get) => ({
            theme: 'system', // 'light' | 'dark' | 'system'

            setTheme: (theme) => {
                set({ theme });
                applyTheme(theme);
            },

            cycleTheme: () => {
                const current = get().theme;
                const next = current === 'light' ? 'dark' : current === 'dark' ? 'system' : 'light';
                set({ theme: next });
                applyTheme(next);
            },

            initTheme: () => {
                const theme = get().theme;
                applyTheme(theme);

                // Listen for system preference changes
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                mediaQuery.addEventListener('change', () => {
                    if (get().theme === 'system') {
                        applyTheme('system');
                    }
                });
            },
        }),
        {
            name: 'theme-storage',
        }
    )
);

function applyTheme(theme) {
    const isDark =
        theme === 'dark' ||
        (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    document.documentElement.classList.toggle('dark', isDark);
}

export default useThemeStore;
