import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../store";
import { Backdrop } from "../Backdrop";
import styles from "./Header.module.css";
import { Menu } from "./Menu";
import { useJwt } from "react-jwt";
import { RoleEnum } from "../../../enums/role.enum";
import { UserProfile } from "../../../models";

const Header: FC = () => {
  const userContext = useContext(UserContext);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);
  const decodedToken = useJwt(userContext.token).decodedToken as UserProfile;

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  const menuItems = userContext.token
    ? [
        { link: "my-bookmarks", label: "My Bookmarks" },
        { link: "my-articles", label: "My Articles" },
        { link: "profile", label: "My Account" },
        { link: "logout", label: "Logout" },
      ]
    : [
        { link: "login", label: "Login" },
        { link: "signup", label: "Signup" },
      ];

  decodedToken &&
    decodedToken.role === RoleEnum.ADMINISTRATOR &&
    menuItems.splice(3, 0, { link: "admin", label: "Admin" });

  return (
    <>
      <header className={styles.header}>
        <div>
          <Link to="/">
            <img
              alt="home logo"
              className={styles.headerIcon}
              src="http://localhost:3000/header-icon.png"
            />
          </Link>
        </div>
        <div>
          {isMobile ? (
            <div className={styles.toggleBar}>
              <FontAwesomeIcon
                onClick={() => setIsNavbarOpen(!isNavbarOpen)}
                icon={faBars}
              />
            </div>
          ) : (
            <Menu
              pos="horizontal"
              items={menuItems}
              onClick={() => setIsNavbarOpen(false)}
            />
          )}
        </div>
      </header>
      {isNavbarOpen && (
        <>
          <Backdrop onClick={() => setIsNavbarOpen(false)} />
          <div className={styles.menu}>
            <Menu
              pos="vertical"
              items={menuItems}
              onClick={() => setIsNavbarOpen(false)}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Header;
