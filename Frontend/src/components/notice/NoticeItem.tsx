import React from "react";
import { useNavigate } from "react-router-dom";
import { noticeObject } from "store/notice";

import { Avatar } from "primereact/avatar";
import styles from "components/notice/NoticeItem.module.css";
import auctionImg from 'assets/auction.png'

interface NoticeItemProps {
  item: noticeObject;
}

const NoticeItem: React.FC<NoticeItemProps> = ({ item }) => {
  const navigate = useNavigate();
  const text: { [key: string]: string } = {
    comment: `${item.nickname}님이 ${item.title} 밈에 댓글을 달았습니다.`,
    reply: `${item.nickname}님이 ${item.title} 밈의 내 댓글에 대댓글을 달았습니다.`,
    auctionStart: `회원님이 찜한 ${item.title} 밈의 블라인드 경매가 시작되었습니다.`,
    auctionFinish: `회원님이 찜한 ${item.title} 밈의 경매가 종료되었습니다.`,
    auctionReg: `회원님이 찜한 ${item.title} 밈의 경매가 등록되었습니다.`,
  };

  const IMG_SRC = item.profileSrc
    ? "http://localhost:3000/" + item.profileSrc
    : auctionImg;
  const MEME_SRC = "http://localhost:3000/" + item.memeSrc;
  const key = item.type;

  const clickHandler = () => {
    console.log(item.type)
    if (["comment", "reply"].includes(key)) {
        navigate(`/meme-detail/${item.id}`)
    }else if (["auctionStart", "auctionFinish"].includes(key)){
        navigate(`/auction/${item.id}`)
    }
    console.log(1)
  };

  return (
    <div className={styles.itemWrapper} onClick={() => clickHandler()}>
      <Avatar image={IMG_SRC} shape="circle" />
      <p className={styles.text}>{text[key]}</p>
      <Avatar image={MEME_SRC} />
    </div>
  );
};

export default NoticeItem;
