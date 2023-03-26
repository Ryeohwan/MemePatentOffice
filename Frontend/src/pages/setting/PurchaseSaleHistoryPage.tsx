// 구매한 nft page (/setting/auction-history/purchase)
import React, { useRef } from "react";
import { useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/configStore";
import { nftHistoryActions } from "store/nftHistory";
import { myHistoryList } from "store/nftHistory"; // type

import PurchaseSaleNftItem from "components/settings/auction/PurchaseSaleNftItem";
import { Divider } from "primereact/divider";

import styles from "pages/setting/AuctionHistory.module.css";
import 'pages/setting/Setting.css'


const PurchaseHistoryPage: React.FC = () => {
  const location = useLocation(); // sale, purchase인지 구분하기 위해 사용
  const myHistoryList = useSelector<RootState, myHistoryList[]>(
    (state) => state.nftHistory.myHistoryList
  ); // 내 history 리스트 Redux에서 가져오기
  const dateList = useRef<string[]>([]);
  return (
    <div className='wrapper'>
      {/* 구매한, 판매한 구분 */}
      {location.pathname.includes("purchase") ? (
        <p className='pageName'>내가 구매한 NFT</p>
      ) : (
        <p className='pageName'>내가 판매한 NFT</p>
      )}
      <Divider className='divider' />
      {myHistoryList.map((item, index) => {
        const formatDate = item.date.split("T")[0];
        if (dateList.current.includes(formatDate)) {
          return (
            <PurchaseSaleNftItem key={`${item.title}-${index}`} item={item} />
          );
        } else {
          dateList.current.push(formatDate);
          return (
            <>
              {dateList.current.length > 1 && <Divider />}
              <p className={styles.date}>{formatDate}</p>
              <PurchaseSaleNftItem key={`${item.title}-${index}`} item={item} />
            </>
          );
        }
      })}
    </div>
  );
};

export default PurchaseHistoryPage;
