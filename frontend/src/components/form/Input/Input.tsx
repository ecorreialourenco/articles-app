import { FC } from "react";
import { InputProps } from "../../../models";
import styles from "./Input.module.css";

export const Input: FC<InputProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(value, name);
  };

  return (
    <div className={styles.input}>
      {label && <span className={styles.label}>{label}</span>}
      <input
        type="text"
        name={name}
        value={value}
        className={styles.inputField}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};
