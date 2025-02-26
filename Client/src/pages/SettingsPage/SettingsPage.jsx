import { useSettings } from '../../context/SettingsContext';

export default function SettingsPage() {
    const { theme, setTheme, font, setFont } = useSettings();

    const handleThemeToggle = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const handleFontChange = (e) => {
        setFont(e.target.value);
    };

    return (
        <div>
            <h1>Settings</h1>
            <div>
                <label>Theme:</label>
                <button onClick={handleThemeToggle}>
                    Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
                </button>
            </div>
            <div>
                <label>Font:</label>
                <select value={font} onChange={handleFontChange}>
                    <option value="sans-serif">sans-serif</option>
                    <option value="notoSerif">Noto Serif</option>
                    <option value="sourceCodePro">Source Code Pro</option>
                </select>
            </div>
        </div>
    );
}
