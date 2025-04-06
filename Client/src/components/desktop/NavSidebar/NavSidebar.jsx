import { AppLogo, HomeIcon, ArchiveIcon } from '../../icons';
import NavItem from '../../NavItem/NavItem';
import TagNavItem from '../../NavItem/TagNavItem';

import styles from './NavSideBar.module.css';
import { useMainView } from '../../../context/MainViewContext'; 

export default function NavSideBar({ className }) {
    const { setCurrentView, currentView } = useMainView();

    const mockTags = ["Lorem Ipsum", "Cooking", "Dev","Foobar"];

    const handleNavClick = (type) => {
        setCurrentView({ type: type });
    };

    const handleTagClick = (label) => {
        setCurrentView({ type: 'tag', tag: label });
    };

    return (
        <nav className={`${styles.NavSideBar} ${className || ''}`}> 
            <div><AppLogo /></div>
            <ul>
                <NavItem 
                    icon={HomeIcon} 
                    label="All Notes" 
                    isActive={currentView.type === "all-notes"}
                    onClick={() => handleNavClick("all-notes")}
                />
                <NavItem 
                    icon={ArchiveIcon} 
                    label="Archived Notes" 
                    isActive={currentView.type === "archived"}
                    onClick={() => handleNavClick("archived")}
                />
            </ul>
            <div className={styles.divider}></div>
            <h2 className={`text-preset-4 ${styles.tagListTitle}`}>Tags</h2>
            <ul className={styles.tagList}>
                {mockTags.map(tag => (
                    <TagNavItem 
                        key={tag} 
                        label={tag} 
                        isActive={currentView.type === "tag" && currentView.tag === tag}
                        onClick={() => handleTagClick(tag)}
                    />
                ))}
            </ul>
        </nav>
    );
}
