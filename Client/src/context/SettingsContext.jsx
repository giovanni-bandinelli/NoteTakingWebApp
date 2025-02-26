import { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
    const [theme, setTheme] = useState('light'); // Default to light mode
    const [font, setFont] = useState('sans-serif');  // Default font, Inter


    useEffect(() => {
        // Apply theme as a data attribute to the <html> element
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        // Apply font as a data attribute to the <html> element
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
