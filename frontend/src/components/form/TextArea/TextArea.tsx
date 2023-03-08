import { FC } from "react";
import { TextAreaProps } from "../../../models";
import styles from "./TextArea.module.css";

export const TextArea: FC<TextAreaProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  cols,
  rows,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange(value, name);
  };

  return (
    <div className={styles.textArea}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        cols={cols}
        placeholder={placeholder}
        onChange={handleChange}
        className={styles.textAreaInput}
        value={value}
      />
    </div>
  );
};
