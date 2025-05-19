import Toast from '../Toast/Toast'
import styles from './ToastContainer.module.css';

export default function ToastContainer({ toasts, removeToast }) {
  return (
    <div className={styles.container}>
      {toasts.map(t => (
        <Toast
          key={t.id}
          type={t.type}
          message={t.message}
          onClose={() => removeToast(t.id)}
        />
      ))}
    </div>
  );
}
