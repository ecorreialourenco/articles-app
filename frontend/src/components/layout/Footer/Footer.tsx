import { FC } from "react";
import styles from "./Footer.module.css";

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.text}>@Copyright 2023</div>
    </footer>
  );
};

export default Footer;
