// home page (/home)
import React, { useEffect } from "react";
import { Carousel } from "primereact/carousel";
import { useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { memeType } from "store/memeList";
import { auctionType } from "store/auctionList";
import useAxios from "hooks/useAxios";

import SkeletonCard from "components/common/card/SkeletonCard";
import NftCard from "components/common/card/NftCard";
import NftAuctionCard from "components/common/card/NftAuctionCard";
import HomeCarousel from "components/main/homepage/HomeCarousel";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
  
  // 요즘 핫한 밈
  const {data: hotMeme, isLoading: hotMemeLoading, sendRequest: hotMemeRequest} = useAxios();

  // 이번주 비싸게 팔린 밈
  const {data: expensiveMeme, isLoading: expensiveMemeLoading, sendRequest: expensiveMemeRequest} = useAxios();

  // 이번주 조회수 많은 밈
  const {data: viewsMeme, isLoading: viewsMemeLoading, sendRequest: viewsMemeRequest} = useAxios();

  // 지금 HOT 한 경매
  // dummy data
  const auctionPopularList = [
    {
      memeId: 1,
      auctionId: 1,
      title:
        "귀여운 토토로 삼형제와 발랄한 자매 사츠키, 메이의 우당탕탕 가족사진입니다",
      time: "16시간 32분",
      highestBid: 430,
      imgUrl: "totoro.jpg",
    },
    {
      memeId: 2,
      auctionId: 3,
      title: "누가 이렇게 예쁘게 낳았어? 엄마엄마가~",
      time: "5시간 32분",
      highestBid: 200,
      imgUrl: "newjeans.jpg",
    },
    {
      memeId: 3,
      auctionId: 2,
      title: "알아들었으면 끄덕여",
      time: "20시간 32분",
      highestBid: 500,
      imgUrl: "theglory.jpeg",
    },
    {
      memeId: 4,
      auctionId: 1,
      title:
        "귀여운 토토로 삼형제와 발랄한 자매 사츠키, 메이의 우당탕탕 가족사진입니다",
      time: "16시간 32분",
      highestBid: 430,
      imgUrl: "totoro.jpg",
    },
    {
      memeId: 5,
      auctionId: 3,
      title: "누가 이렇게 예쁘게 낳았어? 엄마엄마가~",
      time: "5시간 32분",
      highestBid: 200,
      imgUrl: "newjeans.jpg",
    },
    {
      memeId: 6,
      auctionId: 2,
      title: "알아들었으면 끄덕여",
      time: "20시간 32분",
      highestBid: 500,
      imgUrl: "theglory.jpeg",
    },

  ]


  
  // landering 될때 data get 하기 
  // loading 중에는 skeleton
  useEffect(() => {
    hotMemeRequest({url: '/api/mpoffice/meme/search/popular?days=week'})
    expensiveMemeRequest({url: '/api/mpoffice/meme/search/expensive?days=week'})
    viewsMemeRequest({url: '/api/mpoffice/meme/search/views?days=week'})
  }, [])

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
