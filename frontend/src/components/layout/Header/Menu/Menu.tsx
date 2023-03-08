import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Menu.module.css";

interface LinkItem {
  link: string;
  label: string;
}

interface MenuProps {
  pos: string;
  items: LinkItem[];
  onClick?: () => void;
}

export const Menu: FC<MenuProps> = ({ pos, items, onClick }) => (
  <div className={pos === "horizontal" ? styles.horizontal : styles.vertical}>
    {items.map((item: LinkItem, idx: number) => (
      <Link key={idx} to={item.link} onClick={onClick}>
        {item.label}
      </Link>
    ))}
  </div>
);
