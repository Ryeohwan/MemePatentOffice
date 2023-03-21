import React, { useEffect, useState } from "react";

import { Avatar } from "primereact/avatar";
import { Chip } from "primereact/chip";

import styles from "components/auction/main/chat/ChatItem.module.css";

interface ChatItemProps {
  chat: {
    id: string;
    message: string;
    time: string;
  };
}

const ChatItem: React.FC<ChatItemProps> = ({ chat }) => {
  const formatDate = (date: string) => {
    const newDate = date.split("-");
    const hour = newDate[3];
    const minute = newDate[4];

    return `${hour}:${minute}`;
  };
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    setDate(formatDate(chat.time));
  }, [chat]);

  return (
    // 나중에 내 아이디와 같으면 오른쪽
    <div className={chat.id === "조명오" ? styles.myChat : styles.chatItems}>
      <Avatar icon="pi pi-user" shape="circle" className={styles.avatar} />
      <div className={styles.chip}>
        <p>{chat.id}</p>
        <div className={styles.message}>{chat.message}</div>
      </div>
      <p className={styles.date}>{date}</p>
    </div>
  );
};

export default ChatItem;
