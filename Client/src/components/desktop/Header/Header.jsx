import { SettingsIcon } from '../../icons';
import SearchBar from '../../SearchBar/SearchBar';

import styles from './Header.module.css';

import {useMainView} from '../../../context/MainViewContext';
export default function Header({ className }){

    const { setCurrentView } = useMainView();

    return(
        <header className={`${styles.header} ${className || ''}`}>
            <h1 className="text-preset-1"><HeaderTitle></HeaderTitle></h1>
            <div className={styles.wrapper}>
                <SearchBar/>
                <button onClick={()=>{setCurrentView({ type: 'settings' })}}>
                    <SettingsIcon /> 
                </button>
            </div>                   
        </header>
    )
}

function HeaderTitle(){
    const { currentView } = useMainView();
    // reminder possible types: 'all-notes', 'archived', 'tag', 'search', 'settings'
    if(currentView.type == 'all-notes'){return <>All Notes</>}
    if(currentView.type == 'archived'){return <>Archived Notes</>}
    if(currentView.type == 'settings'){return <>Settings</>}
    if(currentView.type == 'tag'){return <><span style={{ color: 'var(--text-color-secondary)', marginRight: '0.5rem'}}> Notes Tagged:</span>{currentView.tag}</>}
    if(currentView.type == 'search'){return <><span style={{ color: 'var(--text-color-secondary)', marginRight: '0.5rem'}}> Search results for:</span>{currentView.searchQuery}</>}

    return <>All Notes</>; //Fallback, no clue if this is overall the right approach to use React Context's API ;-;
}