import { ArchiveIcon, RestoreIcon, DeleteIcon } from '../../../../icons';
import styles from './NoteActions.module.css'; 

export default function NoteActions({ currentView, onRequestDelete, onRequestArchive }) {
  return (
    <aside className={styles.noteActions}>
      {currentView.type === 'archived' ? (
        <button className={styles.actionButton} onClick={onRequestArchive}>
          <span className={styles.icon}><RestoreIcon /></span> <span>Restore Note</span>
        </button>
      ) : (
        <button className={styles.actionButton} onClick={onRequestArchive}>
          <span className={styles.icon}><ArchiveIcon /></span> <span>Archive Note</span>
        </button>
      )}
      <button className={styles.actionButton} onClick={onRequestDelete}>
        <span className={styles.icon}><DeleteIcon /></span> <span>Delete Note</span>
      </button>
    </aside>
  );
}
