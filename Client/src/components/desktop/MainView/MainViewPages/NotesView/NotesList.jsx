import NoteItem from '../../../../NoteItem/NoteItem';
import styles from './NotesList.module.css'; 

export default function NotesList({ notes, selectedNoteId, onSelectNote, handleCreateNewNote, currentView }) {
    let emptyMessage = "You don't have any notes yet. Start a new note to capture your thoughts and ideas!";
    if (currentView.type === "archived") {
        emptyMessage = "No notes have been archived yet. Move notes here for safekeeping, or create a new note.";
    } else if (currentView.type === "tag") {
        emptyMessage = `No notes found with the "${currentView.tag}" tag.`;
    } else if (currentView.type === "search") {
        emptyMessage = `No notes match your search. Try a different keyword or create a new note.`;
    }

    return (
        <aside className={styles.notesListColumn}>
            <button className={`blueButton ${styles.createNoteButton}`} id="createNoteButton" onClick={handleCreateNewNote}>
                <span>+</span> Create New Note
            </button>

            {currentView.type === "archived" && (
                <p className="text-preset-5">
                    All your archived notes are stored here. You can restore or delete them anytime.
                </p>
            )}
            {currentView.type === "tag" && (
                <p className="text-preset-5">
                    All notes with the "{currentView.tag}" tag are shown here.
                </p>
            )}
            {currentView.type === "search" && (
                <p className="text-preset-5">
                    All notes matching "{currentView.searchQuery}" are displayed below.
                </p>
            )}

            {notes?.length > 0 ? (
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
            ) : (
                <div className={`${styles.notesListEmpty} text-preset-5`}>{emptyMessage}</div>
            )}
        </aside>
    );
}



