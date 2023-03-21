import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/configStore";

import ChatItem from "./ChatItem";

import { ScrollPanel } from "primereact/scrollpanel";
import styles from "components/auction/main/chat/ChatList.module.css";

type chat = {
  id: string;
  message: string;
  time: string;
};

const ChatList: React.FC = () => {
  const chatList = useSelector<RootState, chat[]>(
    (state) => state.chat.chatList
  );

  return (
    <ScrollPanel style={{ width: "100%", height: "90%" }}>
      {chatList.map((chat,index) => {
        return <ChatItem chat={chat} key={index} />;
      })}
    </ScrollPanel>
  );
};

export default ChatList;
