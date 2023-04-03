// 구매한 nft page (/setting/auction-history/purchase)
import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAxios from "hooks/useAxios";

import PurchaseSaleNftItem from "components/settings/auction/PurchaseSaleNftItem";
import { Divider } from "primereact/divider";

import styles from "pages/setting/AuctionHistory.module.css";
import "pages/setting/Setting.css";
import SkeletonCard from "components/common/card/SkeletonCard";

type myHistoryList = {
  id: number;
  title: string;
  seller: string;
  price: number;
  imgSrc: string;
  date: string;
};

const PurchaseHistoryPage: React.FC = () => {
  const location = useLocation(); // sale, purchase인지 구분하기 위해 사용
  const { data: myHistoryList, isLoading, sendRequest } = useAxios();

  const dateList = useRef<string[]>([]);
  const userId = JSON.parse(sessionStorage.getItem("user")!).userId;
  const sendUrl = location.pathname.includes("purchase")
    ? `buyedMeme?userId=${userId}`
    : `selledMeme?userId=${userId}`;

  useEffect(() => {
    sendRequest({ url: `/api/mpoffice/meme/${sendUrl}` });
  }, []);
console.log(myHistoryList)
  return (
    <div className="wrapper">
      {/* 구매한, 판매한 구분 */}
      {location.pathname.includes("purchase") ? (
        <p className="pageName">내가 구매한 NFT</p>
      ) : (
        <p className="pageName">내가 판매한 NFT</p>
      )}
      <Divider className="divider" />
      {isLoading ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : (
        <div className={styles.bodyContainer}>
          {myHistoryList &&
            myHistoryList.length > 0 &&
            myHistoryList.map((item: myHistoryList, index: number) => {
              const formatDate = item.date.split("T")[0];
              if (dateList.current.includes(formatDate)) {
                return (
                  <PurchaseSaleNftItem
                    key={`${item.id}-${index}`}
                    item={item}
                  />
                );
              } else {
                dateList.current.push(formatDate);
                return (
                  <div key={`${item.id}-${index}`}>
                    {dateList.current.length > 1 && <Divider/>}
                    <p className={styles.date} key={`${item.date}-${item.id}`}>{formatDate}</p>
                    <PurchaseSaleNftItem
                      key={`${item.id}-${index}`}
                      item={item}
                    />
                  </div>
                );
              }
            })}
        </div>
      )}
    </div>
  );
};

export default PurchaseHistoryPage;
