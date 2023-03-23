// home page (/home)
import React from "react";
import { Carousel } from "primereact/carousel";
import { NavLink } from "react-router-dom";
import NftCard from "components/common/NftCard";
import NftAuctionCard from "components/common/NftAuctionCard";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
  // NFT 가짜 데이터
  const NFTS = [
    {
      id: 1,
      title:
        "귀여운 토토로 삼형제와 발랄한 자매 사츠키, 메이의 우당탕탕 가족사진입니다",
      imgUrl: "totoro.jpg",
      description:
        "나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. ",
    },
    {
      id: 2,
      title: "누가 이렇게 예쁘게 낳았어? 엄마엄마가~",
      imgUrl: "newjeans.jpg",
      description:
        "뉴진스의 곡 OMG 속 가사인 oh my oh my god 가 엄마엄마가~로 들린다고 해서 시작되어 틱톡, 릴스 챌린지로 자리잡은 밈이다. 누가 이렇게 예쁘게 낳았어? 라고 질문하면 뉴진스의 OMG 노래를 부르며 엄마엄마가~ 라고 답한다.",
    },
    {
      id: 3,
      title: "알아들었으면 끄덕여",
      imgUrl: "theglory.jpeg",
      description:
        "인기 드라마 더 글로리 속 학교 폭력 가해자 박연진이 같은 무리의 친구(?) 최혜정에게 하는 대사이다. 최혜정이 박연진 남편의 친구 무리에게 박연진의 학창 시절에 대한 이야기를 해서 박연진이 화나서 하는 대사이다.",
    },
  ];
  // 경매 가짜 데이터
  const AUCTIONS = [
    {
      meme_id: 1,
      auction_id: 1,
      title:
        "귀여운 토토로 삼형제와 발랄한 자매 사츠키, 메이의 우당탕탕 가족사진입니다",
      time: "16시간 32분",
      highest_bid: 430,
      imgUrl: "totoro.jpg",
    },
    {
      meme_id: 2,
      auction_id: 3,
      title: "누가 이렇게 예쁘게 낳았어? 엄마엄마가~",
      time: "5시간 32분",
      highest_bid: 200,
      imgUrl: "newjeans.jpg",
    },
    {
      meme_id: 3,
      auction_id: 2,
      title: "알아들었으면 끄덕여",
      time: "20시간 32분",
      highest_bid: 500,
      imgUrl: "theglory.jpeg",
    },
  ];

  // ------------------------------------------------------------------------------
  
  // Carousel로 띄울 카드 NFT 밈과 Auction 두 개이므로 타입 두 개 지정
  type NftObject = {
    id: number;
    title: string;
    imgUrl: string;
    description: string;
  };
  type AuctionObject = {
    meme_id: number;
    auction_id: number;
    title: string;
    time: string;
    highest_bid: number;
    imgUrl: string;
  };

  const responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
  ];

  const nftCarousel = (nft: NftObject | AuctionObject) => {
    // typeof type guard로 체크 불가능 NftObject에 있는 속성이 AuctionObject에는 없어서 비교 자체가 불가
    // in 키워드로 type guard하면 됨
    if ("description" in nft) {
      return <NftCard items={nft} />;
    } else {
      return (
        <div className={styles.auctionCarousel}>
          <NftAuctionCard items={nft}/>
        </div>
      );
    }
  };
  
  return (
    <div>
      <div className={styles.homeMenuWrapper}>
        <div className={styles.homeMenuTitle}>오늘의 밈</div>
        <NavLink to="/meme-list/type=popular?range=day" className={styles.listRouter}>더보기</NavLink>
      </div>
      <Carousel
        value={NFTS}
        numVisible={3}
        numScroll={3}
        itemTemplate={(page) => nftCarousel(page)}
        orientation={"horizontal"}
        showIndicators={false}
        circular={true}
        responsiveOptions={responsiveOptions}
      />

      <div className={styles.homeMenuWrapper}>
        <div className={styles.homeMenuTitle}>금주의 밈</div>
        <NavLink to="/meme-list/type=popular?range=week" className={styles.listRouter}>더보기</NavLink>
      </div>
      <Carousel
        value={NFTS}
        numVisible={3}
        numScroll={3}
        itemTemplate={(page) => nftCarousel(page)}
        orientation={"horizontal"}
        showIndicators={false}
        circular={true}
        responsiveOptions={responsiveOptions}
      />

      <div className={styles.homeMenuWrapper}>
        <div className={styles.homeMenuTitle}>신규 밈</div>
        <NavLink to="/meme-list/type=new" className={styles.listRouter}>더보기</NavLink>
      </div>
      <Carousel
        value={NFTS}
        numVisible={3}
        numScroll={3}
        itemTemplate={(page) => nftCarousel(page)}
        orientation={"horizontal"}
        showIndicators={false}
        circular={true}
        responsiveOptions={responsiveOptions}
      />

      <hr />

      <div className={styles.homeMenuWrapper}>
        <div className={styles.homeMenuTitle}>인기 경매</div>
        <NavLink to="/auction-list/type=popular" className={styles.listRouter}>더보기</NavLink>
      </div>
      <Carousel
        value={AUCTIONS}
        numVisible={3}
        numScroll={3}
        itemTemplate={(page) => nftCarousel(page)}
        orientation={"horizontal"}
        showIndicators={false}
        responsiveOptions={responsiveOptions}
        circular={true}
      />

      <div className={styles.homeMenuWrapper}>
        <div className={styles.homeMenuTitle}>마감 임박 경매</div>
        <NavLink to="/auction-list/type=deadline" className={styles.listRouter}>더보기</NavLink>
      </div>
      <Carousel
        value={AUCTIONS}
        numVisible={3}
        numScroll={3}
        itemTemplate={(page) => nftCarousel(page)}
        orientation={"horizontal"}
        showIndicators={false}
        responsiveOptions={responsiveOptions}
        circular={true}
      />

      <div className={styles.homeMenuWrapper}>
        <div className={styles.homeMenuTitle}>신규 경매</div>
        <NavLink to="/auction-list/type=new" className={styles.listRouter}>더보기</NavLink>
      </div>
      <Carousel
        value={AUCTIONS}
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