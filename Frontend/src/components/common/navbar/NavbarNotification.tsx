import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import useAxios from "hooks/useAxios";

import { Icon } from "@iconify/react";
import { Badge } from "primereact/badge";
import styles from "./Navbar.module.css";

const NavbarNotification: React.FC = () => {
  const location = useLocation();
  const [isNew, setNew] = useState(false);

  // 새로운 알림 있는지 확인하는 api
  const { data, sendRequest } = useAxios();

  // pathname 변할때마다 확인
  useEffect(() => {
    if (location.pathname === "/notification-list") {
      setNew(false);
    } else {
      sendRequest({url: `/api/mpoffice/alarm/check/${JSON.parse(sessionStorage.user).userId}`})
    }
  }, [location.pathname]);

  useEffect(() => {
    if (data) setNew(data.isExist)
  }, [data])

  return (
    <NavLink to="/notification-list">
      <div className={styles.iconWrapper}>
        <Icon icon="mdi:bell" className={styles.notification} />
        {isNew && <Badge severity="danger" className={styles.badge} />}
      </div>
    </NavLink>
  );
};

export default NavbarNotification;
