import { useState } from 'react';
import { SunIcon, MoonIcon, SystemTheme } from '../../../../icons';
import RadioOption from '../../../../RadioOption/RadioOption';
import { useSettings } from '../../../../../context/SettingsContext';
import { useToast } from '../../../../../context/ToastContext';
import {updateThemeAPI} from '../../../../../api/settings.api';
import styles from './ThemeSettings.module.css';

async function updateSettings(newTheme) {
    console.log("Updating theme in DB:", newTheme);
    return new Promise((resolve) => setTimeout(resolve, 1000)); 
}

export default function ThemeSettings() {
    const { theme, setTheme } = useSettings(); 
    const [selectedTheme, setSelectedTheme] = useState(theme);
    const token = localStorage.getItem('authToken');
    const { showToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateThemeAPI(token, selectedTheme);
            setTheme(selectedTheme);
            showToast({ type: 'success', message: 'Theme updated successfully!' });
        } catch (err) {
            showToast({ type: 'error', message: 'Failed to update theme.' });
        }
    };

    return (
        <form className={styles.themeForm} onSubmit={handleSubmit}>
            <div className="titleWrapper">
                <h2 className="text-preset-1">Color Theme</h2>
                <p>Choose your color theme:</p>
            </div>

            <div className={styles.optionWrapper}>
                <RadioOption
                    Icon={SunIcon} id="lightMode" name="theme" value="light"
                    title="Light Mode" 
                    description="Pick a clean and classic light theme"
                    isChecked={selectedTheme === "light"}
                    onChange={() => setSelectedTheme("light")}
                />
                <RadioOption
                    Icon={MoonIcon} id="darkMode" name="theme" value="dark"
                    title="Dark Mode" 
                    description="Select a sleek and modern dark theme"
                    isChecked={selectedTheme === "dark"}
                    onChange={() => setSelectedTheme("dark")}
                />
                <RadioOption
                    Icon={SystemTheme} id="systemMode" name="theme" value="system"
                    title="System" 
                    description="Adapts to your device's theme"
                    isChecked={selectedTheme === "system"}
                    onChange={() => setSelectedTheme("system")}
                />
            </div>

            <div className={styles.buttonWrapper}>
                <button type="submit" className={`blueButton ${styles.submitButton}`} id="applyButton"><span className={"text-preset-4"}>Apply Changes</span></button>
            </div>
        </form>
    );
}
