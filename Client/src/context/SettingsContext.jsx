import { createContext, useContext, useState, useEffect } from 'react';
import { getFontAPI, getThemeAPI } from '../api/settings.api';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
    const token = localStorage.getItem('authToken');

    const [theme, setTheme] = useState('light'); 
    const [font, setFont] = useState('sans-serif');  

    useEffect(() => {
        async function fetchSettings() {

            if (token) {
                try {
                    const fontRes = await getFontAPI(token);
                    setFont(fontRes.font);

                    const themeRes = await getThemeAPI(token);
                    setTheme(themeRes.theme);
                } catch (err) {
                    console.error('Error fetching user settings:', err);
                }
            }
        }

        fetchSettings();
    }, [token]);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        document.documentElement.setAttribute('data-font', font);
    }, [font]);

    return (
        <SettingsContext.Provider value={{ theme, setTheme, font, setFont }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    return useContext(SettingsContext);
}
