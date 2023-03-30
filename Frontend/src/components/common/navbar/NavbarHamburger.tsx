import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { Icon } from "@iconify/react";
import { Sidebar } from "primereact/sidebar";
import styles from "./NavbarHamburger.module.css";

interface RoutePath {
  pathname: string;
}

const NavbarHamburger: React.FC = () => {
  const { pathname } = useLocation() as RoutePath;
  const navigate = useNavigate();

  // click하면 dropmenu
  const [open, setOpen] = useState<boolean>(false);

  // location 이동하면 닫힘 -> click하면 닫히는걸로 수정 고려
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const mypageHandler = () => {
    // mypage 이동하기 위한 url
    const mypageUrl = `/profile/${
      JSON.parse(sessionStorage.getItem("user")!).nickname
    }/tab=nft`;

    if (pathname.includes("profile")) {
      window.location.href = mypageUrl;
    } else {
      navigate(mypageUrl);
    }
  };

  const accountHandler = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        sessionStorage.setItem("account", account);
        alert("지갑 연결 성공!");
      } else {
        alert("MetaMask를 설치해주세요.");
      }
    } catch (error) {
      console.log(error);
    }
  };

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

          {/* <NavLink to={mypageUrl} className={styles.navLink}>
            마이페이지
          </NavLink> */}

          <div onClick={accountHandler}>지갑 연결하기</div>

          <div className={styles.navLink} onClick={mypageHandler}>
            마이페이지
          </div>

          <p className={styles.navLink}>로그아웃</p>
        </div>
      </Sidebar>
    </>
  );
};

export default NavbarHamburger;
