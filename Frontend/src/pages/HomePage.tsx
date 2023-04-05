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
        // 유저 디비에 wallet_address가 null일 때만 코인 지급
        const walletAddress = JSON.parse(
          sessionStorage.getItem("user")!
        ).walletAddress;
        const userId = JSON.parse(sessionStorage.getItem("user")!).userId;

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
          const giveCoinStatus = await giveSignInCoin();
          console.log("최초 연결 지갑에 코인 지급", giveCoinStatus);

        } else {
          // 이전에 등록했던 지갑과 동일한 경우, 패스
          if (walletAddress === account) {
            console.log("이전에 등록한 지갑과 동일합니다");
            
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
            console.log("1인당 코인 1회만 지급");
            const user = JSON.parse(sessionStorage.getItem("user")!);
            user.walletAddress = account;
            sessionStorage.setItem("user", JSON.stringify(user));
          }
        }
        alert("지갑 연결 성공!");
      } else {
        alert("MetaMask를 설치해주세요.");
      }
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
      imgUrl: "home/meme.gif",
      btnTxt: "지갑 연결하기",
      btnUrl: null,
      btnEffect: accountHandler,
    },
    {
      id: 2,
      imgUrl: "home/uploadmeme.jpg",
      btnTxt: "밈 등록하러 가기",
      btnUrl: "/meme-upload",
      btnEffect: async () => {},
    },
    {
      id: 3,
      imgUrl: "home/auction.jpg",
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
    if ("description" in nft) {
      return <NftCard items={nft} />;
    } else {
      return (
        <div className={styles.auctionCarousel}>
          <NftAuctionCard items={nft} />
        </div>
      );
    }
  };

  return (
    <div>
      {/* main carousel */}
      <HomeCarousel info={MAIN_INFO} />

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

      <hr />

      {/* auction carousel */}
      {/* 여기 데이터 없을 수도 있어서 없으면 아예 영역 자체 안띄우도록 해돔 */}
      {!hotAuctionLoading && hotAuction && hotAuction.length > 0 && (
        <>
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
  );
};

export default HomePage;
