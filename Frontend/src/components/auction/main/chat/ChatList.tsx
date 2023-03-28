import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/configStore";

import ChatItem from "./ChatItem";
import ScrollToTop from "components/common/ScrollToTop";
import { ScrollPanel } from "primereact/scrollpanel";
import styles from "components/auction/main/chat/ChatList.module.css";

type chat = {
  id: string;
  message: string;
  time: string;
};

interface ChatListProps {
  chatVisible : boolean
}

const ChatList: React.FC<ChatListProps>= ({chatVisible}) => {
  const myRef = useRef<ScrollPanel | null>(null);
  const chatList = useSelector<RootState, chat[]>(
    (state) => state.chat.chatList
  );

  useEffect(() => {
    const scrollpanel = myRef.current?.getContent()
    if (scrollpanel){
      const {scrollHeight, clientHeight} = scrollpanel
      myRef.current?.getContent().scrollTo({top:scrollHeight-clientHeight})
    }
    // console.log(myRef.current?.getYBar())
    // myRef.current?.getYBar().scrollTo({top:scrollHeight})
  }, [chatList,chatVisible]);

  return (
    <>
      <ScrollPanel
        ref={myRef}
        style={{
          width: "100%",
          height: "87%",
        }}
      >
        {chatList.map((chat, index) => {
          return <ChatItem chat={chat} key={index} />;
        })}
      </ScrollPanel>
    </>
  );
};

export default ChatList;
