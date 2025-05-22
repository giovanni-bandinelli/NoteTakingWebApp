import { CheckMarkIcon, XMarkIcon, CrossIcon } from '../icons';
import styles from './Toast.module.css';

export default function Toast({ type = 'success', message, onClose }) {
  return (
    <div className={`${styles.toast} text-preset-6`}>
        <span className={`${styles.icon} ${styles[type]}`}>{type == 'success'? <CheckMarkIcon/> : <XMarkIcon/>}</span>
        <span className={styles.message}>{message}</span>
        <button className={styles.close} onClick={onClose}><CrossIcon/></button>
    </div>
  );
}
