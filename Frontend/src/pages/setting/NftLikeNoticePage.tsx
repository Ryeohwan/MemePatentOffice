// 좋아하는 nft page (/setting/history/nft-like)
import React from "react";
import { useLocation } from "react-router-dom"; // 알림받을, 좋아하는 인지 구분

import { memeType } from "store/memeList"; // 밈 카드 type
import { Divider } from "primereact/divider"; // 구분선
import styles from "pages/setting/NftLikeNoticePage.module.css";
import "pages/setting/Setting.css";

// 더미 데이터 (redux 안써도 될듯)
import haku from "assets/haku.png";
import kakao from 'assets/kakao.png'
import logo from 'assets/logo.png'
import NftCard from "components/common/card/NftCard";
const MY_NFT: memeType[] = [
  {
    id: 1,
    title: "하쿠",
    imgUrl: haku,
    description: "이건 하쿠다",
    example: "이건 하쿠다",
  },
  {
    id: 2,
    title: "카카오",
    imgUrl: kakao,
    description: "이건 카카오 로고다",
    example: "이건 카카오 로고다",
  },
  {
    id: 3,
    title: "파란 토끼",
    imgUrl: logo,
    description: "이건 MEME 로고다",
    example: "이건 MEME 로고다",
  },
];

const NftLikePage: React.FC = () => {
  const location = useLocation();

  return (
    <div className="wrapper">
      {/* 헤더 부분 */}
      <p className="pageName">
        {location.pathname.includes("nft-notification")
          ? "알림받을 NFT"
          : "좋아하는 NFT"}
      </p>
      <Divider className="divider" />
      <div className={styles.body}>
        {MY_NFT.map((item)=>{
          return <NftCard items={item}/>
        })}
      </div>
    </div>
  );
};

export default NftLikePage;
