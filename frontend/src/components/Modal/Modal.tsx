import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Backdrop } from "../layout/Backdrop";
import styles from "./Modal.module.css";

interface ModapProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: FC<ModapProps> = ({ isOpen, title, onClose, children }) => {
  return (
    <>
      {isOpen && <Backdrop onClick={onClose} />}
      <div className={isOpen ? styles.isOpen : styles.isClosed}>
        <div className={styles.modal}>
          <div className={styles.title}>
            <span className="close">{title}</span>
            <FontAwesomeIcon
              className={styles.inputIcon}
              onClick={onClose}
              icon={faClose}
            />
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </>
  );
};
