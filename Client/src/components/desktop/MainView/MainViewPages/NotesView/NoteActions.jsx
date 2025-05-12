// NoteActions.jsx
import { ArchiveIcon, RestoreIcon, DeleteIcon } from '../../../../icons';
import styles from './NoteActions.module.css'; // Maybe share or tweak styles.

export default function NoteActions({ currentView, onArchiveNote, onDeleteNote }) {
    return (
        <aside className={styles.noteActions}>
            {currentView.type === 'archived' ? 
                <button className={styles.actionButton} onClick={onArchiveNote}>
                    <RestoreIcon /> <span>Restore Note</span>
                </button> :
                <button className={styles.actionButton} onClick={onArchiveNote}>
                    <ArchiveIcon /> <span>Archive Note</span>
                </button>
            }
            <button className={styles.actionButton} onClick={onDeleteNote}>
                <DeleteIcon /><span>Delete Note</span>
            </button>
        </aside>
    );
}
