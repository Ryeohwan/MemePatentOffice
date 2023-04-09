import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { auctionInfo } from "store/auction";

import { SlideMenu } from "primereact/slidemenu";
import { Button } from "primereact/button";
import { MenuItem } from "primereact/menuitem";

import styles from "components/auction/main/list/AuctionSlideMenu.module.css";
import SellerInfo from "components/auction/main/list/SellerInfo";
import BiddingHistory from "components/auction/main/list/BiddingHistory";

const AuctionSlideMenu: React.FC = () => {
  const navigate = useNavigate();
  const menu = useRef<SlideMenu|null>(null);
  const { sellerNickname } = useSelector<RootState, auctionInfo>(
    (state) => state.auction.auctionInfo
  );
  const [sellerInfoVisible, setSellerInfoVisible] = useState(false);
  const [biddingHistoryInfoVisible, setBiddingHistoryInfoVisible] =
    useState(true);
  const sellerInfoHandler = () => {
    setSellerInfoVisible(true);
    navigate(`${sellerNickname}/tab=nft`);
  };
  const sellerInfoHandlerFalse = () => {
    setSellerInfoVisible(false);
  };
  const biddingInfoHandler = () => {
    setBiddingHistoryInfoVisible(!biddingHistoryInfoVisible);
  };
  const biddingHistoryInfoHandlerFalse = () => {
    setBiddingHistoryInfoVisible(false);
  };

  const goOut = () => {
    navigate("/auction-list/type=new");
  };

  const items: MenuItem[] = [
    {
      label: "입찰 내역",
      icon: "pi pi-chart-bar",
      command: biddingInfoHandler,
    },
    {
      label: "판매자 정보",
      icon: "pi pi-user",
      command: sellerInfoHandler,
    },
    {
      label: "나가기",
      icon: "pi pi-sign-out",
      command: goOut,
    },
  ];
  return (
    <>
      <BiddingHistory
        biddingHistoryInfoVisible={biddingHistoryInfoVisible}
        biddingHistoryInfoHandlerFalse={biddingHistoryInfoHandlerFalse}
      />
      <SellerInfo
        sellerInfoVisible={sellerInfoVisible}
        sellerInfoHandlerFalse={sellerInfoHandlerFalse}
      />
      <div className={styles.slideDiv}>
        <SlideMenu
          appendTo={document.getElementById("auction")}
          className={styles.pSlidemenu}
          ref={menu}
          model={items}
          popup
          viewportHeight={127}
        ></SlideMenu>
        <Button
          className={styles.slideBtn}
          type="button"
          icon="pi pi-bars"
          onClick={(event) => {
            menu.current?.toggle(event);
          }}
        ><p>메뉴</p></Button>
      </div>
    </>
  );
};

export default AuctionSlideMenu;
