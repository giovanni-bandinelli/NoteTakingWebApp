import { SearchIcon } from '../icons';

import styles from './SearchBar.module.css';
import {useMainView} from '../../context/MainViewContext';

export default function SearchBar() {

    const { setCurrentView } = useMainView();

    function submitSearch(){
    
        const searchInput = document.getElementById('searchInput').value.trim(); 
        if (searchInput.trim() === '') return;
        setCurrentView({ type: 'search', searchQuery: searchInput});
    }
  
    return (
        <div className={styles.SearchBarWrapper}>
            <input 
                type='text'
                id='searchInput'
                className={`${styles.input} ${styles.searchInput}`}
                placeholder="Search by title, content, or tags..." 
            />
            <button
                type="button"
                className={styles.SearchBarButton}
                onClick={submitSearch}    
            >
                <SearchIcon/>
            </button>
        </div>
    );
  }