import { NavLink } from "react-router-dom";

import NavbarNotification from "./NavbarNotification";
import NavbarHamburger from "./NavbarHamburger";

import logo from "assets/logo.png";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
        <NavLink to="/home" className={`${styles.navLink} ${styles.logoContainer}`}>
            <img src={logo} alt="logo" className={styles.logoImg} />
            <p className={styles.logoTxt}>MEME</p>
        </NavLink>

        <div className={styles.rightContainer}>
          <NavbarNotification />
          <NavbarHamburger />
      </div>
    </nav>
  );
};

export default Navbar;
