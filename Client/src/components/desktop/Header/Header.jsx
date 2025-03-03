import { SettingsIcon } from '../../icons';
import SearchBar from '../../SearchBar/SearchBar';

import styles from './Header.module.css';

export default function Header(isArchive){
    return(
        <header className={styles.header}>
            <h1 className="text-preset-1">{isArchive ? 'Archived Notes' : 'All Notes'}</h1>
            <div className={styles.wrapper}>
                <SearchBar/>
                <button>
                    <SettingsIcon />
                </button>
            </div>                   
        </header>
    )
}