import { useState } from 'react';
import NavItem from '../../../../NavItem/NavItem';
import { SunIcon, FontIcon, LockIcon, LogoutIcon} from '../../../../icons';

import { useAuth } from '../../../../../context/AuthContext';
//import { useSettings } from '../../../../../context/SettingsContext';

import ThemeSettings from './ThemeSettings';
import FontSettings from './FontSettings';
import ChangePassword from './ChangePassword';

import styles from './SettingsView.module.css';

export default function SettingsView() {
    const [selectedOption, setSelectedOption] = useState("theme");
    const { logout } = useAuth();

    function renderSettingsContent() {
        if (selectedOption === "theme") return <ThemeSettings />;
        if (selectedOption === "font") return <FontSettings />;
        if (selectedOption === "password") return <ChangePassword />;
        return <p>Invalid option</p>;
    }

    return (
        <>
            {/* Sidebar with setting options */}
            <aside className={styles.sidebar}>
                <ul>
                    <NavItem icon={SunIcon} label="Color Theme" isActive={selectedOption === "theme"} onClick={() => setSelectedOption("theme")} />
                    <NavItem icon={FontIcon} label="Font Theme" isActive={selectedOption === "font"} onClick={() => setSelectedOption("font")} />
                    <NavItem icon={LockIcon} label="Change Password" isActive={selectedOption === "password"} onClick={() => setSelectedOption("password")} />
                    <div className={styles.divider}></div>
                    <NavItem icon={LogoutIcon} label="Logout" isActive={selectedOption === "logout"} onClick={() => logout()} />
                </ul>
            </aside>

            {/* Main settings content */}
            <section className={styles.settingsContent}>
                {renderSettingsContent()}
            </section>
        </>
    );
}
