import React from "react";
import { useNavigate } from "react-router-dom";
import { noticeObject } from "store/notice";
import ElapsedText from "components/common/ElapsedText";

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
  const IMG_SRC = item.profileSrc
    ? "http://localhost:3000/" + item.profileSrc
    : auctionImg;
  const MEME_SRC = "http://localhost:3000/" + item.memeSrc;
  const key = item.type;

  const clickHandler = (type: string) => {
    if (type === "auctionStart") {
      navigate(`/auction/${item.id}`);
    } else if (type === "auctionEnd") {
    } else if (type === "auctionReg") {
    } else if (type === "meme") {
      navigate(`/meme-detail/${item.id}`);
    } else {
      navigate(`/profile/${item.nickname}/tab=nft`);
    }
  };

  return (
    <>
      <div className={styles.itemWrapper}>
        <Avatar
          className={styles.avatar}
          image={IMG_SRC}
          shape="circle"
          onClick={() => clickHandler(key)}
        />
        {key === "comment" ? (
          <div className={styles.textWrapper}>
            <p className={styles.text}>
              <span onClick={() => clickHandler("nickname")}>
                {item.nickname}
              </span>{" "}
              님이{" "}
              <span onClick={() => clickHandler("meme")}>{item.title}</span>{" "}
              밈에 댓글을 달았습니다.
            </p>
            <p className={styles.elapsedText}>{elapsedText}</p>
          </div>
        ) : key === "reply" ? (
          <div className={styles.textWrapper}>
            <p className={styles.text}>
              <span onClick={() => clickHandler("nickname")}>
                {item.nickname}
              </span>{" "}
              님이{" "}
              <span onClick={() => clickHandler("meme")}>{item.title}</span>{" "}
              밈의 내 댓글에 대댓글을 달았습니다.
            </p>
            <p className={styles.elapsedText}>{elapsedText}</p>
          </div>
        ) : key === "auctionStart" ? (
          <div className={styles.textWrapper}>
            <p className={styles.text}>
              회원님이 찜한{" "}
              <span onClick={() => clickHandler("meme")}>{item.title}</span>{" "}
              밈의 블라인드 경매가 시작되었습니다.
            </p>
            <p className={styles.elapsedText}>{elapsedText}</p>
          </div>
        ) : key === "auctionEnd" ? (
          <div className={styles.textWrapper}>
            <p className={styles.text}>
              회원님이 찜한{" "}
              <span onClick={() => clickHandler("meme")}>{item.title}</span>{" "}
              밈의 블라인드 경매가 종료되었습니다.
            </p>
            <p className={styles.elapsedText}>{elapsedText}</p>
          </div>
        ) : (
          <div className={styles.textWrapper}>
            <p className={styles.text}>
              회원님이 찜한{" "}
              <span onClick={() => clickHandler("meme")}>{item.title}</span>{" "}
              밈의 경매가 등록되었습니다..
            </p>
            <p className={styles.elapsedText}>{elapsedText}</p>
          </div>
        )}
        <Avatar
          className={styles.avatar}
          onClick={() => clickHandler("meme")}
          image={MEME_SRC}
        />
      </div>
      <Divider />
    </>
  );
};

export default NoticeItem;
