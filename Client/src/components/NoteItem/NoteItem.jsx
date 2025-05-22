import styles from './NoteItem.module.css';

export default function NoteItem({ title, tags, date, onClick, isActive }) {
    return (
        <li className={`text-preset-4 ${styles.NoteItem}`}>
            <button className={`${styles.noteButton} ${isActive ? styles.active : ''}`} onClick={onClick}>
                <span className='text-preset-3'>{title}</span>
                <ul className={styles.tagsList}>
                    {tags.map(tag => <li className={styles.tag} key={tag}>{tag}</li>)}
                </ul>
                <span className={`${styles.date} text-preset-5`}>{date}</span>
            </button>
        </li>
    );
}
