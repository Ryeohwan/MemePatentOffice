import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/configStore";

import { chatList } from "store/chat";
import ChatItem from "./ChatItem";
import { ScrollPanel } from "primereact/scrollpanel";

type chat = chatList;

interface ChatListProps  {
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
