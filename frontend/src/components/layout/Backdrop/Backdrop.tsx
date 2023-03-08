import { FC } from "react";
import styles from "./Backdrop.module.css";

interface BackdropProps {
  onClick?: () => void;
}

export const Backdrop: FC<BackdropProps> = ({ onClick }) => (
  <div className={styles.backdrop} onClick={onClick} />
);
