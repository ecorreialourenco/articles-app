import { FC } from "react";
import styles from "./TextItem.module.css";

interface TextItemProps {
  label: string;
  value: string | number;
}

export const TextItem: FC<TextItemProps> = ({ label, value }) => (
  <div>
    <span className={styles.text}>{label}:</span>
    <span className={styles.value}>{value}</span>
  </div>
);
