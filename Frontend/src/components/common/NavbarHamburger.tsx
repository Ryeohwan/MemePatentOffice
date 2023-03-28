import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { Icon } from "@iconify/react";
import { Sidebar } from "primereact/sidebar";
import styles from "./NavbarHamburger.module.css";

interface RoutePath {
  pathname: string;
}

const NavbarHamburger: React.FC = () => {
  const { pathname } = useLocation() as RoutePath;

  // click하면 dropmenu
  const [open, setOpen] = useState<boolean>(false);

  // location 이동하면 닫힘 -> click하면 닫히는걸로 수정 고려
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // mypage 이동하기 위한 url
  const mypageUrl = `/profile/${JSON.parse(sessionStorage.getItem('user')!).nickname}/tab=nft`;

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
          <NavLink to="/meme-list/type=new" className={styles.navLink}>
            밈 사전
          </NavLink>

          <NavLink to="/auction-list/type=new" className={styles.navLink}>
            경매 둘러보기
          </NavLink>

          <NavLink to={mypageUrl} className={styles.navLink}>
            마이페이지
          </NavLink>

          <p className={styles.navLink}>로그아웃</p>
        </div>
      </Sidebar>
    </>
  );
};

export default NavbarHamburger;
