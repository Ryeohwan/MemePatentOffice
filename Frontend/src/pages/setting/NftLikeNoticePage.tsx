// 좋아하는 nft page (/setting/history/nft-like)
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; // 알림받을, 좋아하는 인지 구분

import { memeType } from "store/memeList"; // 밈 카드 type
import { Divider } from "primereact/divider"; // 구분선
import styles from "pages/setting/NftLikeNoticePage.module.css";
import "pages/setting/Setting.css";
import useAxios from "hooks/useAxios";
import NftCard from "components/common/card/NftCard";
import { Skeleton } from "primereact/skeleton";
import SkeletonCard from "components/common/card/SkeletonCard";

const NftLikePage: React.FC = () => {
  const location = useLocation();
  const userId = JSON.parse(sessionStorage.getItem("user")!).userId;

  const sendUrl = location.pathname.includes("nft-notification")
    ? `getCarted?userId=${userId}`
    : `likedMeme?userId=${userId}`;
  const { data: myList, isLoading, sendRequest } = useAxios();
  useEffect(() => {
    sendRequest({ url: `/api/mpoffice/meme/${sendUrl}` });
  }, []);
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
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            {myList &&
              myList.length > 0 &&
              myList.map((item: memeType) => {
                return (
                  <NftCard key={`${item.title}-${item.id}`} items={item} />
                );
              })}
          </>
        )}
      </div>
    </div>
  );
};

export default NftLikePage;
