import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { memeListActions } from "store/memeList";

import { Icon } from "@iconify/react";
import { Sidebar } from "primereact/sidebar";
import styles from "./NavbarHamburger.module.css";
import { web3 } from "web3config";

interface RoutePath {
  pathname: string;
}

const NavbarHamburger: React.FC = () => {
  const { pathname } = useLocation() as RoutePath;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // click하면 dropmenu
  const [open, setOpen] = useState<boolean>(false);

  // location 이동하면 닫힘 -> click하면 닫히는걸로 수정 고려
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // 네브바에서 밈사전으로 들어가는 경우 memeList redux reset
  const memeListHandler = () => {
    dispatch(memeListActions.resetAll());
    navigate("/meme-list/type=new");
  };

  const mypageHandler = () => {
    // mypage 이동하기 위한 url
    const mypageUrl = `/profile/${
      JSON.parse(sessionStorage.getItem("user")!).nickname
    }/tab=nft`;

    if (pathname.includes("profile") && !pathname.includes("setting")) {
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
        let account = "";
        if (typeof(accounts[0]) === "string") {
          account = web3.utils.toChecksumAddress(accounts[0]);
        }

        // 유저 디비에 wallet_address가 null일 때만 코인 지급
        

        sessionStorage.setItem("account", account);
        alert("지갑 연결 성공!");
      } else {
        alert("MetaMask를 설치해주세요.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = () => {
    sessionStorage.clear();
    navigate("/");
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
          {/* <NavLink to="/meme-list/type=new" className={styles.navLink}>
            밈 사전
          </NavLink> */}

          <div className={styles.navLink} onClick={memeListHandler}>
            밈 사전
          </div>

          <NavLink to="/auction-list/type=new" className={styles.navLink}>
            경매 둘러보기
          </NavLink>

          <div onClick={accountHandler}>지갑 연결하기</div>

          <div className={styles.navLink} onClick={mypageHandler}>
            마이페이지
          </div>

          <p className={styles.navLink} onClick={logoutHandler}>
            로그아웃
          </p>
        </div>
      </Sidebar>
    </>
  );
};

export default NavbarHamburger;
