import React, { useState } from "react";

import { Button } from "primereact/button";
import ChatSideBar from "./ChatSideBar";
import { WebSocketProps } from "type";

const ChatMain: React.FC<WebSocketProps> = ({client, auctionId}) => {
  const [chatVisible,setChatVisible] = useState<boolean>(false);

  const chatVisibleHandlerTrue = () => {
    setChatVisible(true)
  }
  const chatVisibleHandlerFalse = () => {
    setChatVisible(false)
  }
  return (
    <>
      <Button icon="pi pi-comment" onClick={chatVisibleHandlerTrue}/>
      <ChatSideBar
        chatVisibleHandlerFalse={chatVisibleHandlerFalse}
        chatVisible={chatVisible}
        client={client}
        auctionId={auctionId}
        />
    </>
  );
};

export default ChatMain;
