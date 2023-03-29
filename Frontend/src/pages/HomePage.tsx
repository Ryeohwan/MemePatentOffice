// home page (/home)
import React from "react";
import { Carousel } from "primereact/carousel";
import { useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { memeType } from "store/memeList";
import { auctionType } from "store/auctionList";

import NftCard from "components/common/NftCard";
import NftAuctionCard from "components/common/NftAuctionCard";
import HomeCarousel from "components/main/homepage/HomeCarousel";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {


  // 얘네 다 빼고 useAxios() 훅으로 대체
  const memeList = useSelector<RootState, memeType[]>(
    (state) => state.memeList.memeNewList
  );
  
  const auctionPopularList = useSelector<RootState, auctionType[]>(
    (state) => state.auctionList.auctionPopularList
  );
  
  // Main Carousel에 내려보낼 props
  const MAIN_INFO = [
    {
      id: 1,
      imgUrl: "home/meme.gif",
      btnTxt: "밈 사전 바로가기",
      btnUrl: "/meme-list/type=new",
    },
    {
      id: 2,
      imgUrl: "home/uploadmeme.jpg",
      btnTxt: "밈 등록하러 가기",
      btnUrl: "/meme-upload",
    },
    {
      id: 3,
      imgUrl: "home/auction.jpg",
      btnTxt: "경매 구경하러 가기",
      btnUrl: "/auction-list/type=popular",
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
  const nftCarousel = (nft: memeType | auctionType) => {
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
      <Carousel
        value={memeList}
        numVisible={3}
        numScroll={3}
        itemTemplate={(page) => nftCarousel(page)}
        orientation={"horizontal"}
        showIndicators={false}
        circular={true}
        responsiveOptions={responsiveOptions}
      />

      <div className={styles.homeMenuWrapper}>
        <div className={styles.homeMenuTitle}>이번 주 비싸게 팔린 밈</div>
      </div>
      <Carousel
        value={memeList}
        numVisible={3}
        numScroll={3}
        itemTemplate={(page) => nftCarousel(page)}
        orientation={"horizontal"}
        showIndicators={false}
        circular={true}
        responsiveOptions={responsiveOptions}
      />

      <div className={styles.homeMenuWrapper}>
        <div className={styles.homeMenuTitle}>이번 주 조회수 많은 밈</div>
      </div>
      <Carousel
        value={memeList}
        numVisible={3}
        numScroll={3}
        itemTemplate={(page) => nftCarousel(page)}
        orientation={"horizontal"}
        showIndicators={false}
        circular={true}
        responsiveOptions={responsiveOptions}
      />

      <hr />

      {/* auction carousel */}
      <div className={styles.homeMenuWrapper}>
        <div className={styles.homeMenuTitle}>지금 HOT한 경매</div>
      </div>
      <Carousel
        value={auctionPopularList}
        numVisible={3}
        numScroll={3}
        itemTemplate={(page) => nftCarousel(page)}
        orientation={"horizontal"}
        showIndicators={false}
        responsiveOptions={responsiveOptions}
        circular={true}
      />
    </div>
  );
};

export default HomePage;
