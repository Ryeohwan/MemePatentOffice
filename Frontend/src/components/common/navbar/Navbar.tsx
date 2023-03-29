import { NavLink, useLocation } from "react-router-dom";

import NavbarSearch from "./NavbarSearch";
import NavbarNotification from "./NavbarNotification";
import NavbarHamburger from "./NavbarHamburger";

import logo from "assets/logo.png";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
        <NavLink to="/main" className={`${styles.navLink} ${styles.logoContainer}`}>
            <img src={logo} alt="logo" className={styles.logoImg} />
            <p className={styles.logoTxt}>MEME</p>
        </NavLink>

      <div className={styles.rightContainer}>
        {!location.pathname.startsWith("/meme-list/") && (
          <div className={styles.rightItem}>
            <NavbarSearch />
          </div>
        )}
        <div className={styles.rightItem}>
          <NavbarNotification />
        </div>
        <div className={styles.rightItem}>
          <NavbarHamburger />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
