// home page (/home)
import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "primereact/carousel";
import { useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { memeType } from "store/memeList";
import { auctionCardType } from "store/auction";
import useAxios from "hooks/useAxios";
import { checkMyBalance, giveSignInCoin, web3 } from "web3config";
import SkeletonCard from "components/common/card/SkeletonCard";
import NftCard from "components/common/card/NftCard";
import NftAuctionCard from "components/common/card/NftAuctionCard";
import HomeCarousel from "components/main/homepage/HomeCarousel";
import styles from "./HomePage.module.css";
import CheckingModal from "components/auction/upload/CheckingModal";

import auctionCarousel from "assets/auctionCarousel.png"
import uploadMemeImg from "assets/uploadmeme.jpg";
import memeGif from "assets/meme.gif";

const HomePage: React.FC = () => {
  // 요즘 핫한 밈
  const {
    data: hotMeme,
    isLoading: hotMemeLoading,
    sendRequest: hotMemeRequest,
  } = useAxios();

  // 이번주 비싸게 팔린 밈
  const {
    data: expensiveMeme,
    isLoading: expensiveMemeLoading,
    sendRequest: expensiveMemeRequest,
  } = useAxios();

  // 이번주 조회수 많은 밈
  const {
    data: viewsMeme,
    isLoading: viewsMemeLoading,
    sendRequest: viewsMemeRequest,
  } = useAxios();

  // 지금 HOT 한 경매
  // dummy data
  const {
    data: hotAuction,
    isLoading: hotAuctionLoading,
    sendRequest: hotAuctionRequest,
  } = useAxios();

  const { sendRequest: postWalletRequest } = useAxios();
  const myBalance = useRef<number | undefined>();

  // 돈 들어오고 있다고 모달로 알림
  const [modalTxt, setModalTxt] = useState("");
  const [checkModalVisible, setCheckModalVisible] = useState<boolean>(false);
  const controlCheckModal = (visible: boolean) => {
    setCheckModalVisible(visible);
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
          console.log(account);
        }

        // 유저 디비에서 가져온 wallet_address
        const walletAddress = JSON.parse(
          sessionStorage.getItem("user")!
        ).walletAddress;
        const userId = JSON.parse(sessionStorage.getItem("user")!).userId;

        controlCheckModal(true);
        // 최초로 연결한 지갑인 경우, 코인 지급하고 post address
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

          const giveCoinStatus = await giveSignInCoin();
          if (giveCoinStatus) {
            setModalTxt("500SSF를 받았습니다!");
            await new Promise((resolve) => setTimeout(resolve, 1000));
            controlCheckModal(false);
          } else {
            setModalTxt("네트워크가 불안정해 선물을 받지 못했습니다.");
            await new Promise((resolve) => setTimeout(resolve, 1000));
            controlCheckModal(false);
          }
        } else {
          // 이전에 등록했던 지갑과 동일한 경우, 패스
          if (walletAddress === account) {
            setModalTxt("이전에 등록한 지갑과 동일한 지갑에 연결 중입니다.");
            await new Promise((resolve) => setTimeout(resolve, 1000));
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
            setModalTxt("최초 등록된 지갑에 한해서만 10SSF가 지급됩니다");
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
        await new Promise((resolve) => setTimeout(resolve, 1000));
        controlCheckModal(false);
      }
      controlCheckModal(false);
      await checkBalance();
      if (!myBalance.current || myBalance.current === undefined) {
        console.log("잔액 조회에 실패했습니다, 지갑 다시 연결해보셈");
      } else {
        console.log("지갑 연결하자마자 잔액 조회", myBalance.current);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const checkBalance = async () => {
    const account = JSON.parse(sessionStorage.getItem("user")!).walletAddress;
    try {
      if (!account) return false;
      console.log("home에서 잔액조회 실행됨");
      await checkMyBalance()
        .then((balance) => {
          console.log("내 지갑 잔액:", balance);
          myBalance.current = balance;
        })
        .catch((error) => {
          console.error(error);
        });
      return myBalance.current;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  // landering 될때 data get 하기
  // loading 중에는 skeleton
  useEffect(() => {
    hotMemeRequest({ url: "/api/mpoffice/meme/search/popular?days=week" });
    expensiveMemeRequest({
      url: "/api/mpoffice/meme/search/expensive?days=week",
    });
    viewsMemeRequest({ url: "/api/mpoffice/meme/search/views?days=week" });
    hotAuctionRequest({ url: "/api/auction/carousel" });
  }, []);

  // Main Carousel에 내려보낼 props
  const MAIN_INFO = [
    {
      id: 1,
      imgUrl: memeGif,
      btnTxt: "지갑 연결하기",
      btnUrl: null,
      btnEffect: accountHandler,
    },
    {
      id: 2,
      imgUrl: uploadMemeImg,
      btnTxt: "밈 등록하러 가기",
      btnUrl: "/meme-upload",
      btnEffect: async () => {},
    },
    {
      id: 3,
      imgUrl: auctionCarousel,
      btnTxt: "경매 구경하러 가기",
      btnUrl: "/auction-list/type=popular",
      btnEffect: async () => {},
    },
  ];

  // 반응형 캐러셀
  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: "768px",
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  // 밈, 경매 캐러셀
  const nftCarousel = (nft: memeType | auctionCardType) => {
    return (
      <div className={styles.carouselCardContainer}>
        {"description" in nft ? (
          <NftCard items={nft} />
        ) : (
          <div className={styles.auctionCarousel}>
            <NftAuctionCard items={nft} />
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div>
        {/* main carousel */}
        <HomeCarousel info={MAIN_INFO} />

        <div className={styles.contour}/>
        
        {/* meme carousel */}
        <div className={styles.homeMenuWrapper}>
          <div className={styles.homeMenuTitle}>요즘 HOT한 밈</div>
        </div>
        {hotMemeLoading && (
          <div className={styles.skeletonWrapper}>
            <SkeletonCard />
          </div>
        )}
        {hotMeme && !hotMemeLoading && (
          <Carousel
            value={hotMeme.content}
            numVisible={3}
            numScroll={3}
            itemTemplate={(page) => nftCarousel(page)}
            orientation={"horizontal"}
            showIndicators={false}
            circular={true}
            responsiveOptions={responsiveOptions}
          />
        )}

        <div className={styles.contour}/>

        <div className={styles.homeMenuWrapper}>
          <div className={styles.homeMenuTitle}>이번 주 비싸게 팔린 밈</div>
        </div>
        {expensiveMemeLoading && (
          <div className={styles.skeletonWrapper}>
            <SkeletonCard />
          </div>
        )}
        {expensiveMeme && !expensiveMemeLoading && (
          <Carousel
            value={expensiveMeme.content}
            numVisible={3}
            numScroll={3}
            itemTemplate={(page) => nftCarousel(page)}
            orientation={"horizontal"}
            showIndicators={false}
            circular={true}
            responsiveOptions={responsiveOptions}
          />
        )}

        <div className={styles.contour}/>

        <div className={styles.homeMenuWrapper}>
          <div className={styles.homeMenuTitle}>이번 주 조회수 많은 밈</div>
        </div>
        {viewsMemeLoading && (
          <div className={styles.skeletonWrapper}>
            <SkeletonCard />
          </div>
        )}
        {viewsMeme && !viewsMemeLoading && (
          <Carousel
            value={viewsMeme.content}
            numVisible={3}
            numScroll={3}
            itemTemplate={(page) => nftCarousel(page)}
            orientation={"horizontal"}
            showIndicators={false}
            circular={true}
            responsiveOptions={responsiveOptions}
          />
        )}


        {/* auction carousel */}
        {/* 여기 데이터 없을 수도 있어서 없으면 아예 영역 자체 안띄우도록 해돔 */}
        {!hotAuctionLoading && hotAuction && hotAuction.length > 0 && (
          <> 
            <div className={styles.contour}/>

            <div className={styles.homeMenuWrapper}>
              <div className={styles.homeMenuTitle}>지금 HOT한 경매</div>
            </div>
            <Carousel
              value={hotAuction}
              numVisible={3}
              numScroll={3}
              itemTemplate={(page) => nftCarousel(page)}
              orientation={"horizontal"}
              showIndicators={false}
              responsiveOptions={responsiveOptions}
              circular={true}
            />
          </>
        )}
      </div>
      <CheckingModal
        checkModalVisible={checkModalVisible}
        controlCheckModal={controlCheckModal}
        headerInput="지갑 조회 중..."
        textInput={modalTxt}
      />
    </>
  );
};

export default HomePage;
