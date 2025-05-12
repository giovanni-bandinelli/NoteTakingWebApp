// NotesList.jsx
import NoteItem from '../../../../NoteItem/NoteItem';
import styles from './NotesList.module.css'; // You might want a new file for small tweaks.

export default function NotesList({ notes, selectedNoteId, handleCreateNewNote, onSelectNote, currentView }) {
    return (
        <aside className={styles.notesListColumn}>
            <button className={`blueButton ${styles.createNoteButton}`} id="createNoteButton" onClick={handleCreateNewNote}>
                <span>+</span> Create New Note
            </button>

            {currentView.type !== "all-notes" && (
                <p className={styles.listDescription}>Text changes based on selected currentView.</p>
            )}

            <ul className={styles.notesList}>
                {notes.map(note => (
                    <NoteItem
                        key={note.id}
                        title={note.title}
                        tags={note.tags}
                        date={note.date}
                        onClick={() => onSelectNote(note.id)}
                        isActive={note.id === selectedNoteId}
                    />
                ))}
            </ul>
        </aside>
    );
}


