import React, { useState } from "react";

import { Button } from "primereact/button";
import ChatSideBar from "./ChatSideBar";

const ChatMain: React.FC = () => {
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
      <ChatSideBar chatVisibleHandlerFalse={chatVisibleHandlerFalse} chatVisible={chatVisible}/>
    </>
  );
};

export default ChatMain;
