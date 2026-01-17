import { useEffect } from 'react';
import { FaSun, FaMoon, FaDesktop } from 'react-icons/fa';
import useThemeStore from '../../stores/themeStore';

const ThemeToggle = () => {
    const { theme, cycleTheme, initTheme } = useThemeStore();

    useEffect(() => {
        initTheme();
    }, [initTheme]);

    const icons = {
        light: FaSun,
        dark: FaMoon,
        system: FaDesktop,
    };

    const labels = {
        light: 'Light mode',
        dark: 'Dark mode',
        system: 'System preference',
    };

    const Icon = icons[theme];

    return (
        <button
            type="button"
            onClick={cycleTheme}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors duration-150"
            aria-label={`Current theme: ${labels[theme]}. Click to change.`}
            title={labels[theme]}
        >
            <Icon className="w-5 h-5" />
        </button>
    );
};

export default ThemeToggle;
