import React from "react";
import { useNavigate } from "react-router-dom";
import { noticeObject } from "store/notice";
import ElapsedText from "components/common/elements/ElapsedText";

import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";

import styles from "components/notice/NoticeItem.module.css";
import auctionImg from "assets/auction.png";

interface NoticeItemProps {
  item: noticeObject;
}

const NoticeItem: React.FC<NoticeItemProps> = ({ item }) => {
  const navigate = useNavigate();
  const elapsedText = ElapsedText(item.date);
  const IMG_SRC = item.profileSrc ? item.profileSrc : auctionImg;
  // COMMENT / REPLY / AUCTION_START / AUCTION_END / AUCTION_REG  
  const key = item.type;

  const clickHandler = (type: string) => {
    if (type === "toProfile") {
      navigate(`/profile/${item.nickname}/tab=nft`)
    } else if (type === "toDetail ") {
      navigate(`/meme-detail/${item.memeId}/tab=trade`)
    } else if (type === "toDetailComment") {
      navigate(`/meme-detail/${item.memeId}/tab=comment`, {state: {}})
    } else if (type === "toDetailAuction") {
      navigate (`/meme-detail/${item.memeId}/tab=trade`, {state: {}})
    } else if (type === "toAuction") {
      navigate(`/meme-detail/${item.auctionId}`)
    } else {
      return;
    }
  };

  return (
    <>
      <div className={styles.itemWrapper}>
        {/* 경매 관련이면 icon 댓글 관련이면 user img */}
        <Avatar
          className={styles.avatar}
          image={IMG_SRC}
          shape="circle"
          onClick={() => clickHandler(["COMMENT", "REPLY"].includes(key) ? "toProfile" : "")}
        />
        
        {key === "COMMENT" ? (
          // 댓글
          <div className={styles.textWrapper}>
            <p className={styles.text}>
              <span onClick={() => clickHandler("toProfile")}>
                {item.nickname}
              </span>
              님이 {" "}
              <span onClick={() => clickHandler("toDetailComment")}>{item.title}</span>
              밈에 댓글을 달았습니다.
            </p>
            <p className={styles.elapsedText}>{elapsedText}</p>
          </div>

        ) : key === "REPLY" ? (
          // 대댓글
          <div className={styles.textWrapper}>
            <p className={styles.text}>
              <span onClick={() => clickHandler("toProfile")}>
                {item.nickname}
              </span>
              님이 {" "}
              <span onClick={() => clickHandler("toDetailComment")}>{item.title}</span>
              밈의 내 댓글에 대댓글을 달았습니다.
            </p>
            <p className={styles.elapsedText}>{elapsedText}</p>
          </div>

        ) : key === "AUCTION_START" ? (
          // 경매 시작
          <div className={styles.textWrapper}>
            <p className={styles.text}>
              회원님이 찜한 {" "}
              <span onClick={() => clickHandler("toDetailAuction")}>{item.title}</span>
              밈의 경매가 시작되었습니다.
            </p>
            <p className={styles.elapsedText}>{elapsedText}</p>
          </div>
        
        ) : key === "AUCTION_END" ? (
          // 경매 끝
          <div className={styles.textWrapper}>
            <p className={styles.text}>
              회원님이 찜한 {" "}
              <span onClick={() => clickHandler("toDetail")}>{item.title}</span>
              밈의 경매가 종료되었습니다.
            </p>
            <p className={styles.elapsedText}>{elapsedText}</p>
          </div>

        ) : (
          // 경매 등록
          <div className={styles.textWrapper}>
            <p className={styles.text}>
              회원님이 찜한 {" "}
              <span onClick={() => clickHandler("toDetailAuction")}>{item.title}</span>
              밈의 경매가 등록되었습니다.
            </p>
            <p className={styles.elapsedText}>{elapsedText}</p>
          </div>
        )}

        <Avatar
          className={styles.avatar}
          onClick={() => clickHandler("meme")}
          image={item.memeSrc}
        />
      </div>
      <Divider />
    </>
  );
};

export default NoticeItem;
