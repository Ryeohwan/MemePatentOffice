import { NavLink } from "react-router-dom";

import { Icon } from '@iconify/react';
import styles from "./Navbar.module.css";

const NavbarNotification: React.FC = () => {
// 새로운 알림 있는지 확인하는 api
  
  return (
    <NavLink to="/notification-list">
      <Icon icon="mdi:bell" className={styles.notification}/>
    </NavLink>
  );
};

export default NavbarNotification;
