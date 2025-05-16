import { ArchiveIcon, RestoreIcon, DeleteIcon } from '../../../../icons';
import styles from './NoteActions.module.css'; 

export default function NoteActions({ currentView, onRequestDelete, onRequestArchive }) {
  return (
    <aside className={styles.noteActions}>
      {currentView.type === 'archived' ? (
        <button className={styles.actionButton} onClick={onRequestArchive}>
          <RestoreIcon /> <span>Restore Note</span>
        </button>
      ) : (
        <button className={styles.actionButton} onClick={onRequestArchive}>
          <ArchiveIcon /> <span>Archive Note</span>
        </button>
      )}
      <button className={styles.actionButton} onClick={onRequestDelete}>
        <DeleteIcon /> <span>Delete Note</span>
      </button>
    </aside>
  );
}
