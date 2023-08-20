import styles from "./Modal.module.css"
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {children}
        <span className={styles.closeButton} onClick={onClose}>
          &#x2716;
        </span>
      </div>
    </div>
  );
};

export default Modal;
