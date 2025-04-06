import styles from './NavItem.module.css';
import { ChevronRightIcon } from '../icons'; 

export default function NavItem({ icon: Icon,isActive, label, onClick }) {
    return (
        <li className={`text-preset-4 ${styles.navItem}`}>
            <button className={`${styles.navButton} ${isActive ? styles.active : ''}`} onClick={onClick}>
                <div className={styles.contentWrapper}>
                    {Icon && <div className={styles.icon}><Icon/></div>} 
                    <span className={styles.label}>{label}</span>
                </div>
                <div className={styles.arrow}><ChevronRightIcon/></div> 
            </button>
        </li>
    );
}