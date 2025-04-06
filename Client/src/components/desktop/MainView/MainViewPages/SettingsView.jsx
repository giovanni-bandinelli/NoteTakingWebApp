import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { SunIcon, FontIcon, LockIcon, InfoIcon, LogoutIcon, MoonIcon, SystemTheme, FontSansSerifIcon, FontSerifIcon, FontMonoSpaceIcon } from '../../../icons';

import NavItem from '../../../NavItem/NavItem';
import RadioOption from '../../../RadioOption/RadioOption';
import PasswordInput from '../../../PasswordInput/PasswordInput';

import styles from './SettingsView.module.css'; 

import {AuthContext} from '../../../../context/AuthContext';
import { useSettings } from '../../../../context/SettingsContext';


export default function SettingsView() {
    const [selectedOption, setSelectedOption] = useState("theme");

    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    function renderSettingsContent() {
        if (selectedOption === "theme") return <ThemeSettings/>;
        if (selectedOption === "font") return <FontSettings/>;
        if (selectedOption === "password") return <ChangePassword/>;
        return <p>how are you even getting this bruh??</p>;
    }

    function handleLogout(){
        
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        navigate("/auth");
    }

    return (
        <>
            {/* Sidebar with setting options */}
            <aside className={styles.firstColumn}>
                <ul>
                    <NavItem icon={SunIcon} label="Color Theme" isActive={selectedOption === "theme"} onClick={() => setSelectedOption("theme")} />
                    <NavItem icon={FontIcon} label="Font Theme" isActive={selectedOption === "font"} onClick={() => setSelectedOption("font")} />
                    <NavItem icon={LockIcon} label="Change Password" isActive={selectedOption === "password"} onClick={() => setSelectedOption("password")} />
                    <div className={styles.divider}></div>
                    <NavItem icon={LogoutIcon} label="Logout" isActive={selectedOption === "logout"} onClick={()=>handleLogout()} />
                </ul>
            </aside>

            {/* Main settings content */}
            <section className={styles.settingsContent}>
                {renderSettingsContent()}
            </section>
        </>
    );
}

// I might decide to make each Setting Option its own component

// First/Default option: Color Theme Setting

async function updateSettings(newTheme) { // Mock API call
    console.log("Updating theme in DB:", newTheme);
    return new Promise((resolve) => setTimeout(resolve, 1000)); 
}

function ThemeSettings() {
    const { theme, setTheme } = useSettings(); // Get current theme
    const [selectedTheme, setSelectedTheme] = useState(theme); // Local selection state

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        console.log("Submitting theme:", selectedTheme);
        await updateSettings(selectedTheme); // Update DB
        setTheme(selectedTheme); // Apply globally after API call
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
                <button type="submit" className={styles.submitButton} id="applyButton">Apply Changes</button>
            </div>
        </form>
    );
}

// Second option: Font Theme Setting, basically the same as Color Setting but making a shared component for the 2 felt overkill(?)

async function updateFont(newFont) { // Mock API call
    console.log("Updating font in DB:", newFont);
    return new Promise((resolve) => setTimeout(resolve, 1000)); 
}

function FontSettings() {
    const { font, setFont } = useSettings(); 
    const [selectedFont, setSelectedFont] = useState(font); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Changing font:", selectedFont);
        await updateFont(selectedFont); // Update DB
        setFont(selectedFont); // Apply globally after API call
    };

    return (
        <form className={styles.themeForm} onSubmit={handleSubmit}>
            <div className="titleWrapper">
                <h2 className="text-preset-1">Font Theme</h2>
                <p>Choose your font theme:</p>
            </div>

            <div className={styles.optionWrapper}>
                <RadioOption
                    Icon={FontSansSerifIcon} id="sansSerif" name="theme" value="sans-serif"
                    title="Sans-Serif" 
                    description="Clean and modern, easy to read."
                    isChecked={selectedFont === "sans-serif"}
                    onChange={() => setSelectedFont("sans-serif")}
                />
                <RadioOption
                    Icon={FontSerifIcon} id="serif" name="theme" value="serif"
                    title="Serif" 
                    description="Classic and elegant for a timeless feel."
                    isChecked={selectedFont === "serif"}
                    onChange={() => setSelectedFont("serif")}
                />
                <RadioOption
                    Icon={FontMonoSpaceIcon} id="monospace" name="theme" value="monospace"
                    title="Monospace" 
                    description="Code-like, great for a technical vibe."
                    isChecked={selectedFont === "monospace"}
                    onChange={() => setSelectedFont("monospace")}
                />
            </div>

            <div className={styles.buttonWrapper}>
                <button type="submit" className={styles.submitButton} id="applyButton">Apply Changes</button>
            </div>
        </form>
    );
}

// Third option: Change Password Setting

function ChangePassword(){
    function handleSubmit(){console.log("HIIII!!!")}
    return (
        <form className={styles.themeForm} onSubmit={handleSubmit} autoComplete='off'>
            <div className="titleWrapper">
                <h2 className="text-preset-1">Change Password</h2>
            </div>

            <div className={styles.passwordInputsWrapper}>
                <label> 
                    <h3 className='text-preset-4'>Old Password</h3>
                    <PasswordInput autocomplete="off"/>
                </label>
                <label>
                    <h3 className='text-preset-4'>New Password</h3>
                    <PasswordInput autocomplete="off"/>
                    <p className={`${styles.hintText} text-preset-5`}><InfoIcon style={{fontSize:"var(--text-preset-5-font-size)",stroke:"red"}} />At least 8 characters</p>    
                </label>
                <label>
                    <h3 className='text-preset-4'>Confirm New Password</h3>
                    <PasswordInput autocomplete="off"/>
                </label>
            </div>

            <div className={styles.buttonWrapper}>
                <button type="submit" className={styles.submitButton} id="applyButton">Save Password</button>
            </div>
        </form>
    );
}
