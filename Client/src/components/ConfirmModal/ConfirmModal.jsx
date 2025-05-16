import styles from './ConfirmModal.module.css';

export default function ConfirmModal ({
  isOpen,
  onClose,
  onConfirm,
  icon,
  title,
  message,
  confirmLabel = "Confirm",
  confirmStyle = "Archive",
}){
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalContent}>

                <div className={styles.iconContainer}>{icon}</div>
                <div className={styles.modalText}>
                    <h2 className={`text-preset-3`}>{title}</h2>
                    <p className={`text-preset-5`}>{message}</p>
                </div>
            </div>

            <div className={styles.buttonContainer}>
                <button className={styles.cancelButton} onClick={onClose}>
                    Cancel
                </button>
                <button className={`${styles.confirmButton} ${styles[confirmStyle]}`} onClick={onConfirm}>
                    {confirmLabel}
                </button>
            </div>
        </div>
    </div>
  );
};
