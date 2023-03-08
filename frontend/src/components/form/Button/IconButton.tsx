import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import styles from "./Button.module.css";
import { ButtonTypeEnum } from "../../../enums/button.enum";

interface IconButtonProps {
  icon: IconDefinition;
  onClick: () => void;
  type: ButtonTypeEnum;
}

export const IconButton: FC<IconButtonProps> = ({ icon, onClick, type }) => {
  return (
    <button
      className={`${styles.iconButton} ${type ? styles[type] : ""}`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};
