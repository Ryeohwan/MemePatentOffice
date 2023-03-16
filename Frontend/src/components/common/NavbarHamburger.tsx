import { useState } from "react";
import { NavLink } from "react-router-dom";

import { Icon } from "@iconify/react";
import { Sidebar } from "primereact/sidebar";
import styles from "./NavbarHamburger.module.css";

const NavbarHamburger: React.FC = () => {
  // click하면 dropmenu
  const [open, setOpen] = useState(false);

  return (
    <>
      <Icon
        icon="system-uicons:menu-hamburger"
        className={styles.hamburger}
        onClick={() => {
          setOpen(!open);
        }}
      />

      <Sidebar
        className={styles.dropContainer}
        visible={open}
        position="top"
        showCloseIcon={false}
        onHide={() => setOpen(false)}
      >

        <hr />

        <div className={styles.dropMenu}>

          <NavLink to="/meme-list" className={styles.navLink}>
            밈 도감
          </NavLink>

          <NavLink to="/auction-list" className={styles.navLink}>
            경매목록
          </NavLink>

          <NavLink to="/profile/:nickname" className={styles.navLink}>
            마이페이지
          </NavLink>

          <p className={styles.navLink}>로그아웃</p>

        </div>
      
      </Sidebar>
    </>
  );
};

export default NavbarHamburger;
