import { useMainView } from '../../../context/MainViewContext';
import styles from './MainView.module.css'; 
import SettingsView from './MainViewPages/SettingsView';

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
                <>
                    <div className={styles.notesList}>
                        {/** First column - list of notes based on filter */}
                        <p>Notes List (Filtered)</p>
                    </div>
                    <div className={styles.noteContent}>
                        {/** Second column - note content editor */}
                        <p>Note Content</p>
                    </div>
                    {currentView.type !== 'settings' && currentView.type !== 'search' && (
                        <div className={styles.noteActions}>
                            {/** Third column - delete & archive/restore buttons */}
                            <p>{currentView.type === 'archived' ? 'Restore Note' : 'Archive Note'}</p>
                            <p>Delete Note</p>
                        </div>
                    )}
                </>
            );
        }

        if (currentView.type === 'create-note') {
            return (
                <>
                    <div className={styles.notesList}>
                        {/** First column - list of notes (or empty state) */}
                        <p>Notes List</p>
                    </div>
                    <div className={styles.noteContent}>
                        {/** Second column - New Note Editor */}
                        <p>New Note Editor</p>
                    </div>
                </>
            );
        }

        return <p>Something went wrong</p>; // Fallback if `currentView` is unexpected
    }

    return (
        <main className={styles.mainContent}>
            {renderMainContent()}
        </main>
    );
}
