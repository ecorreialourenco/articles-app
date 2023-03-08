import { FC } from "react";
import { ButtonTypeEnum } from "../../../enums/button.enum";
import styles from "./Button.module.css";

interface ButtonProps {
  label: string;
  type: ButtonTypeEnum;
  disabled?: boolean;
  onClick: () => void;
}

export const Button: FC<ButtonProps> = ({ label, type, disabled, onClick }) => (
  <button
    className={`${styles.button} ${type ? styles[type] : ""}`}
    onClick={() => onClick()}
    disabled={disabled}
  >
    {label}
  </button>
);
