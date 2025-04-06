import styles from './NavItem.module.css';
import { ChevronRightIcon, TagIcon } from '../icons'; 

export default function TagNavItem({ label, isActive, onClick }) {
    return (
        <li className={`text-preset-4 ${styles.navItem}`}>
            <button className={`${styles.navButton} ${isActive ? styles.active : ''}`} onClick={onClick}>
                <div className={styles.contentWrapper}>
                    <div className={styles.icon}><TagIcon/></div>
                    <span className={styles.label}>{label}</span>
                </div>
                <div className={styles.arrow}><ChevronRightIcon/></div> 
            </button>
        </li>
    );
}
