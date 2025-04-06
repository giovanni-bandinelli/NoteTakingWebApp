import { createContext, useContext, useState } from 'react';

const MainViewContext = createContext();

export function MainViewProvider({ children }) {
    const [currentView, setCurrentView] = useState({ 
        type: 'all-notes',  // Possible types: 'all-notes', 'archived', 'tag', 'search', 'settings'
        tag: null,
        searchQuery: null
    });

    return (
        <MainViewContext.Provider value={{ currentView, setCurrentView }}>
            {children}
        </MainViewContext.Provider>
    );
}


export function useMainView() {
    return useContext(MainViewContext);
}
