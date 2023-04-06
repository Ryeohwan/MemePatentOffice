import React, { useState } from "react";

import { Button } from "primereact/button";
import ChatSideBar from "./ChatSideBar";
import { WebSocketProps } from "type";

const ChatMain: React.FC<WebSocketProps> = ({
  seeChat,
  seeChatHandler,
  client,
  auctionId,
}) => {
  const [chatVisible, setChatVisible] = useState<boolean>(false);

  const chatVisibleHandlerTrue = () => {
    setChatVisible(true);
    seeChatHandler()
  };
  const chatVisibleHandlerFalse = () => {
    setChatVisible(false);
  };
  return (
    <>
    {seeChat ? 
      <Button icon="pi pi-comment" badge='1' onClick={chatVisibleHandlerTrue} />
      :
      <Button icon="pi pi-comment" onClick={chatVisibleHandlerTrue} />
    }
      <ChatSideBar
        seeChat={seeChat}
        seeChatHandler={seeChatHandler}
        chatVisibleHandlerFalse={chatVisibleHandlerFalse}
        chatVisible={chatVisible}
        client={client}
        auctionId={auctionId}
      />
    </>
  );
};

export default ChatMain;
