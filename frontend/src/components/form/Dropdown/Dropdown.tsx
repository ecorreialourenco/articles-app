import { FC } from "react";
import { DropdownProps, Option } from "../../../models";
import styles from "./Dropdown.module.css";

export const Dropdown: FC<DropdownProps> = ({
  name,
  label,
  options,
  value,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange(value, name);
  };

  return (
    <div className={styles.dropdown}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className={styles.select}
      >
        {options.map((option: Option, idx: number) => (
          <option key={idx} value={option.value} className={styles.option}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
