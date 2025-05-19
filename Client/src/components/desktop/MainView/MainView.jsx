import { useMainView } from '../../../context/MainViewContext';
import styles from './MainView.module.css';

import SettingsView from './MainViewPages/SettingsView/SettingsView';
import NotesView from './MainViewPages/NotesView/NotesView';


export default function MainView() {
    const { currentView } = useMainView();

    function renderMainContent() {
        if (currentView.type === 'settings') {
            return (
                <SettingsView />
            );
        }

        if (currentView.type === 'all-notes' || currentView.type === 'archived' || currentView.type === 'tag' || currentView.type === 'search') {
            return (
                <NotesView currentView={currentView}/> 
            );
        }

        return <p>Something went wrong, please try reloading the page.</p>; // 99% this should can't ever happen?
    }

    return (
        <main className={styles.mainContent}>
            {renderMainContent()}
        </main>
    );
}
