import { FC } from "react";
import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return <span className={styles.error}>{message}</span>;
};
