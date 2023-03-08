import { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { InputProps } from "../../../models";
import styles from "./InputPassword.module.css";

export const InputPassword: FC<InputProps> = ({
  label,
  name,
  value,
  onChange,
}) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(value, name);
  };

  return (
    <div className={styles.input}>
      {label && <span className={styles.label}>{label}</span>}
      <input
        name={name}
        type={isHidden ? "password" : "text"}
        className={styles.inputField}
        value={value}
        onChange={handleChange}
      />
      <FontAwesomeIcon
        className={label ? styles.inputIconWithLabel : styles.inputIcon}
        onClick={() => setIsHidden(!isHidden)}
        icon={!isHidden ? faEye : faEyeSlash}
      />
    </div>
  );
};
