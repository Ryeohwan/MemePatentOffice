// home page (/home)
import React from "react";
import { Carousel } from "primereact/carousel";
import { useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { memeType } from "store/memeList";
import { auctionType } from "store/auctionList";

import NftCard from "components/common/card/NftCard";
import NftAuctionCard from "components/common/card/NftAuctionCard";
import HomeCarousel from "components/main/homepage/HomeCarousel";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
  
  // dummy data
  // 얘네 다 빼고 useAxios() 훅으로 대체
  const memeList = [
    {
      id: 1,
      nickname: 'test',
      title:
        "귀여운 토토로 삼형제와 발랄한 자매 사츠키, 메이의 우당탕탕 가족사진입니다",
      imgUrl: "totoro.jpg",
      description: "오순도순 토토로 가족",
      example:
        "나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. ",
    },
    {
      id: 2,
      nickname: 'test',
      title: "누가 이렇게 예쁘게 낳았어? 엄마엄마가~",
      imgUrl: "newjeans.jpg",
      description: "뉴진스의 곡 OMG 속 가사인 oh my oh my god 가 엄마엄마가~로 들린다고 해서 시작되었다.",
      example:
        "틱톡, 릴스 챌린지로 자리잡은 밈이다. 누가 이렇게 예쁘게 낳았어? 라고 질문하면 뉴진스의 OMG 노래를 부르며 엄마엄마가~ 라고 답한다.",
    },
    {
      id: 3,
      nickname: 'test',
      title: "알아들었으면 끄덕여",
      imgUrl: "theglory.jpeg",
      description: "내 말 알아들었으면 끄덕여라",
      example:
        "인기 드라마 더 글로리 속 학교 폭력 가해자 박연진이 같은 무리의 친구(?) 최혜정에게 하는 대사이다. 최혜정이 박연진 남편의 친구 무리에게 박연진의 학창 시절에 대한 이야기를 해서 박연진이 화나서 하는 대사이다.",
    },
    {
      id: 4,
      nickname: 'test',
      title:
        "귀여운 토토로 삼형제와 발랄한 자매 사츠키, 메이의 우당탕탕 가족사진입니다",
      imgUrl: "totoro.jpg",
      description: "오순도순 토토로 가족",
      example:
        "나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. ",
    },
    {
      id: 5,
      nickname: 'test',
      title: "누가 이렇게 예쁘게 낳았어? 엄마엄마가~",
      imgUrl: "newjeans.jpg",
      description: "뉴진스의 곡 OMG 속 가사인 oh my oh my god 가 엄마엄마가~로 들린다고 해서 시작되었다.",
      example:
        "틱톡, 릴스 챌린지로 자리잡은 밈이다. 누가 이렇게 예쁘게 낳았어? 라고 질문하면 뉴진스의 OMG 노래를 부르며 엄마엄마가~ 라고 답한다.",
    },
    {
      id: 6,
      nickname: 'test',
      title: "알아들었으면 끄덕여",
      imgUrl: "theglory.jpeg",
      description: "내 말 알아들었으면 끄덕여라",
      example:
        "인기 드라마 더 글로리 속 학교 폭력 가해자 박연진이 같은 무리의 친구(?) 최혜정에게 하는 대사이다. 최혜정이 박연진 남편의 친구 무리에게 박연진의 학창 시절에 대한 이야기를 해서 박연진이 화나서 하는 대사이다.",
    },
  ]

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
