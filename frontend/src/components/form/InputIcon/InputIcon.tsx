import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputIconProps } from "../../../models";
import styles from "./InputIcon.module.css";

export const InputIcon: FC<InputIconProps> = ({
  label,
  name,
  value,
  onChange,
  onClick,
  icon,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(value, name);
  };

  return (
    <div className={styles.input}>
      {label && <span className={styles.label}>{label}</span>}
      <input
        name={name}
        type="text"
        className={styles.inputField}
        value={value}
        onChange={handleChange}
      />
      <FontAwesomeIcon
        className={label ? styles.inputIconWithLabel : styles.inputIcon}
        onClick={onClick}
        icon={icon}
      />
    </div>
  );
};
