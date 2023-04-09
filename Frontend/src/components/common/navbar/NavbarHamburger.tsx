import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { memeListActions } from "store/memeList";
import useAxios from "hooks/useAxios";

import { Icon } from "@iconify/react";
import { Sidebar } from "primereact/sidebar";
import styles from "./NavbarHamburger.module.css";
import { checkMyBalance, giveSignInCoin, web3 } from "web3config";
import CheckingModal from "components/auction/upload/CheckingModal";
import metamask from "assets/metamask.jpeg";

interface RoutePath {
  pathname: string;
}

const NavbarHamburger: React.FC = () => {
  const { pathname } = useLocation() as RoutePath;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sendRequest } = useAxios();
  const { sendRequest: postWalletRequest } = useAxios();
  const { data: againUserInfo, sendRequest: getUserInfo } = useAxios();
  // const myBalance = useRef<number | undefined>();
  const [myBalance, setMyBalance] = useState<any>();

  const userId = pathname.includes("redirect")
    ? ""
    : JSON.parse(sessionStorage.getItem("user")!).userId;
  const [modalTxt, setModalTxt] = useState("");
  const [checkModalVisible, setCheckModalVisible] = useState<boolean>(false);
  const controlCheckModal = (visible: boolean) => {
    setCheckModalVisible(visible);
  };

  // login 페이지에서는 user 없어서 일단 session에 user 없으면 null 박아둠
  const myAccount = sessionStorage.user
    ? JSON.parse(sessionStorage.user).walletAddress
    : null;

  // click하면 dropmenu
  const [open, setOpen] = useState<boolean>(false);

  // location 이동하면 닫힘 -> click하면 닫히는걸로 수정 고려
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // 네브바에서 밈사전으로 들어가는 경우 memeList redux reset
  const memeListHandler = () => {
    dispatch(memeListActions.resetAll());
    setOpen(!open);
    navigate("/meme-list/type=new");
  };

  const mypageHandler = () => {
    // mypage 이동하기 위한 url
    const mypageUrl = `/profile/${
      JSON.parse(sessionStorage.getItem("user")!).nickname
    }/tab=nft`;

    if (pathname.includes("profile") && !pathname.includes("setting")) {
      setOpen(!open);
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
        if (typeof accounts[0] === "string") {
          account = web3.utils.toChecksumAddress(accounts[0]);
        }

        // 최초로 연결한 지갑인 경우, 코인 지급하고 post address
        controlCheckModal(true);
        // 최초로 연결한 지갑인 경우, 코인 지급하고 post address

        const walletAddress = JSON.parse(
          sessionStorage.getItem("user")!
        ).walletAddress;
        if (walletAddress === null) {
          await postWalletRequest({
            url: "/api/mpoffice/user/update/wallet",
            method: "POST",
            data: {
              userId: userId,
              walletAddress: account,
            },
          });
          const user = JSON.parse(sessionStorage.getItem("user")!);
          user.walletAddress = account;
          sessionStorage.setItem("user", JSON.stringify(user));
          setModalTxt(
            "최초로 연결된 지갑이네요. 500SSF를 선물로 받는 중입니다!"
          );

          const giveCoinStatus = await giveSignInCoin(account);
          if (giveCoinStatus) {
            setModalTxt("500SSF를 받았습니다!");
            await new Promise((resolve) => setTimeout(resolve, 2000));
            controlCheckModal(false);
          } else {
            setModalTxt("네트워크가 불안정해 선물을 받지 못했습니다.");
            await new Promise((resolve) => setTimeout(resolve, 2000));
            controlCheckModal(false);
          }
        } else {
          // 이전에 등록했던 지갑과 동일한 경우, 패스
          if (walletAddress === account) {
            setModalTxt("이전에 등록한 지갑과 동일한 지갑에 연결 중입니다.");
            await new Promise((resolve) => setTimeout(resolve, 2000));
            controlCheckModal(false);
          } else if (walletAddress !== account) {
            // 이전에 등록한 지갑은 존재하지만 지금 지갑과 다를 경우, 새로 post
            postWalletRequest({
              url: "/api/mpoffice/user/update/wallet",
              method: "POST",
              data: {
                userId: userId,
                walletAddress: account,
              },
            });
            setModalTxt("최초 등록된 지갑에 한해서만 500SSF가 지급됩니다");
            await new Promise((resolve) => setTimeout(resolve, 2000));
            controlCheckModal(false);
            const user = JSON.parse(sessionStorage.getItem("user")!);
            user.walletAddress = account;
            sessionStorage.setItem("user", JSON.stringify(user));
          }
        }
        setModalTxt("지갑 연결 성공!");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        controlCheckModal(false);
      } else {
        setModalTxt("Metamask를 설치해 주세요.");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        controlCheckModal(false);
      }
      controlCheckModal(false);
      await checkBalance();

    } catch (error) {
      setModalTxt("이전에 등록한 지갑이 있는 걸로 보입니다.");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      controlCheckModal(false);
    }
  };

  const logoutHandler = () => {
    sessionStorage.clear();
    navigate("/");
  };

  // 잔액 조회
  const checkBalance = async () => {
    const account = JSON.parse(sessionStorage.getItem("user")!).walletAddress;
    try {
      if (!account) return false;
      await checkMyBalance()
        .then((balance) => {
          setMyBalance(balance);
        })
      return myBalance;
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    if (myAccount !== null && open) {
      checkBalance();
    }
  }, [pathname, open]);

  return (
    <>
      <>
        <Icon
          icon="system-uicons:menu-hamburger"
          className={styles.hamburger}
          onClick={() => {
            setOpen(!open);
          }}
        />

        <Sidebar
          // className={account ? styles.loginDropContainer : styles.dropContainer}
          className={styles.dropContainer}
          visible={open}
          position="top"
          showCloseIcon={false}
          onHide={() => setOpen(false)}
        >
          <hr />

          <div className={styles.dropMenu}>
            {myAccount !== null ? (
              <div className={styles.hamburgerMenu}>
                <img src={metamask} alt="" className={styles.menuImg}/>
                <div className={styles.menuTxt}>
                  내 잔액 :{" "}
                  {myBalance ? myBalance/(10**18) : 0} SSF
                </div>
              </div>
            ) : (
              <div onClick={accountHandler}  className={styles.hamburgerMenu}>
                <img src={metamask} alt=""  className={styles.menuImg}/>
                <div className={styles.menuTxt}>
                  지갑 연결하기
                </div>
              </div>
            )}

            <div className={styles.navLink} onClick={memeListHandler}>
              밈 사전
            </div>

            <NavLink
              onClick={() => setOpen(!open)}
              to="/auction-list/type=new"
              className={styles.navLink}
            >
              경매 둘러보기
            </NavLink>

            <div className={styles.navLink} onClick={mypageHandler}>
              마이페이지
            </div>
            <p className={styles.navLink} onClick={logoutHandler}>
              로그아웃
            </p>
          </div>
        </Sidebar>
      </>
      <CheckingModal
        checkModalVisible={checkModalVisible}
        controlCheckModal={controlCheckModal}
        headerInput="지갑 조회 중..."
        textInput={modalTxt}
      />
    </>
  );
};

export default NavbarHamburger;
