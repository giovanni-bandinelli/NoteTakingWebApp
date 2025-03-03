import { useState } from 'react';
import { SearchIcon } from '../icons';

import styles from './SearchBar.module.css';


export default function SearchBar() {

    function submitSearch(){
        console.log("Cercando hard");
    }
  
    return (
        <div className={styles.SearchBarWrapper}>
            <input 
                type='text'
                className={`${styles.input} ${styles.searchInput}`}
                placeholder="Search by title, content, or tags..." 
            >
            </input>
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