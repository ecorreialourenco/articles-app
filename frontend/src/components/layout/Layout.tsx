import { FC } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <>
    <Header />
    <div className={styles.container}>{children}</div>
    <Footer />
  </>
);

export default Layout;
