import React, { useRef, useState } from "react";
import { SlideMenu } from "primereact/slidemenu";
import { Button } from "primereact/button";
import { MenuItem } from "primereact/menuitem";

import styles from "components/auction/main/list/AuctionSlideMenu.module.css";
import SellerInfo from "./SellerInfo";
import BiddingHistory from "./BiddingHistory";

const AuctionSlideMenu: React.FC = () => {
  const menu = useRef<SlideMenu>(null);
  const [sellerInfoVisible, setSellerInfoVisible] = useState(false);
  const [biddingHistoryInfoVisible, setBiddingHistoryInfoVisible] =
    useState(false);
  const sellerInfoHandler = () => {
    setSellerInfoVisible(true);
  };
  const sellerInfoHandlerFalse = () => {
    setSellerInfoVisible(false);
  };
  const biddingInfoHandler = () => {
    setBiddingHistoryInfoVisible(true);
  };
  const biddingHistoryInfoHandlerFalse = () => {
    setBiddingHistoryInfoVisible(false);
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
        ></Button>
      </div>
    </>
  );
};

export default AuctionSlideMenu;
