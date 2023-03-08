import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
import { InputIcon } from "../../form";
import styles from "./ArticlesSearch.module.css";

interface ArticlesSearchProps {
  value: string;
  onSearch: (value: string) => void;
  onSubmit: () => void;
}

export const ArticlesSearch: FC<ArticlesSearchProps> = ({
  value,
  onSearch,
  onSubmit,
}) => (
  <div className={styles.container}>
    <span className={styles.text}>Search:</span>
    <InputIcon
      name="search"
      value={value}
      onChange={(val) => onSearch(val)}
      icon={faMagnifyingGlass}
      onClick={onSubmit}
    />
  </div>
);
