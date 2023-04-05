import React, { useEffect, useState } from "react";

import { Avatar } from "primereact/avatar";

import styles from "components/auction/main/chat/ChatItem.module.css";

interface ChatItemProps {
  chat: {
    id: string;
    message: string;
    time: string;
  };
}

const ChatItem: React.FC<ChatItemProps> = ({ chat }) => {
  const imgUrl = JSON.parse(sessionStorage.getItem("user")!).imgUrl;
  const formatDate = (date: string) => {
    const newDate = date.split("T");
    const thmms = newDate[1];
    const newTime = thmms!.split(":");
    const hour = newTime[0];
    const minute = newTime[1];

    return `${hour}:${minute}`;
  };
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    setDate(formatDate(chat.time));
  }, [chat]);

  return (
    // 나중에 내 아이디와 같으면 오른쪽
    <div
      className={
        chat.id === JSON.parse(sessionStorage.getItem("user")!).nickname
          ? styles.myChat
          : styles.chatItems
      }
    >
      <Avatar
        image={imgUrl}
        icon="pi pi-megaphone"
        shape="circle"
        className={styles.avatar}
      />
      <div className={styles.chip}>
        <p>{chat.id}</p>
        <div
          className={
            chat.id === JSON.parse(sessionStorage.getItem("user")!).nickname
              ? styles.myMessage
              : styles.message
          }
        >
          {chat.message}
        </div>
      </div>
      <p className={styles.date}>{date}</p>
    </div>
  );
};

export default ChatItem;
