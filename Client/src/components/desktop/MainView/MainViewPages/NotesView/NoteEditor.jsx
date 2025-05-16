import { TagIcon, ClockIcon, StatusIcon } from '../../../../icons';
import styles from './NoteEditor.module.css'; // Maybe split or reuse styles.

export default function NoteEditor({ selectedNote, setSelectedNote, onSaveNote, onCancelEdit }) {
    if (!selectedNote) {
        return <section className={styles.noteContent}><p>Select a note to view its content.</p></section>;
    }
    
    const tagsText = selectedNote.tags.join(', ');

    return (
        <section className={styles.noteContent}>
            <h2 className={styles.noteContentTitle}>
                <input
                className={styles.noteTitleInput}
                type="text"
                placeholder="Enter title..."
                value={selectedNote.title}
                onChange={(e) => setSelectedNote(prev => ({ ...prev, title: e.target.value }))}
                />
            </h2>

            <div className={styles.noteContentInfoSection}>
                <div className={`${styles.noteContentInfo} text-preset-5`}>
                    <span className={styles.noteContentInfoTitle}><TagIcon /><span>Tags</span></span>
                    <input
                    className={styles.noteTagsInput}
                    type="text"
                    placeholder="Enter tags, comma separated"
                    value={selectedNote.tags.join(', ')}
                    onChange={(e) => {
                      const tagsArray = e.target.value.split(',').map(tag => tag.trim());
                      setSelectedNote(prev => ({ ...prev, tags: tagsArray }));
                    }}
                    />
                </div>
                
                {selectedNote.archived && <div className={`${styles.noteContentInfo} text-preset-5`}>
                    <span className={styles.noteContentInfoTitle}><StatusIcon /><span>Status</span></span>
                    <span>Archived</span>
                </div>}

                <div className={`${styles.noteContentInfo} text-preset-5`}>
                    <span className={styles.noteContentInfoTitle}><ClockIcon /><span>Last edited</span></span>
                    <span>{selectedNote.date}</span>
                </div>
            </div>

            <textarea
                className={styles.noteContentText}
                value={selectedNote.content}
                onChange={(e) => setSelectedNote(prev => ({ ...prev, content: e.target.value }))}
            />

            <div className={styles.noteContentOptions}>
                <button className={`blueButton ${styles.saveButton}`} onClick={onSaveNote}>Save Note</button>
                <button className={styles.cancelButton} onClick={onCancelEdit}>Cancel</button>
            </div>
        </section>
    );
}
