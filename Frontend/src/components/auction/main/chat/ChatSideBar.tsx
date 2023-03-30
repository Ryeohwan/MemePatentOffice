import React, { useEffect, useRef, useState } from "react";

import ChatInputText from "./ChatInputText";
import ChatList from "./ChatList";

import { Sidebar } from "primereact/sidebar";
import styles from "components/auction/main/chat/ChatSideBar.module.css";
import { WebSocketProps } from "type";

interface ChatSideBarProps extends WebSocketProps{
  chatVisible: boolean;
  chatVisibleHandlerFalse: () => void;
}

const ChatSideBar: React.FC<ChatSideBarProps> = ({
  chatVisible,
  chatVisibleHandlerFalse,
  client,
  auctionId
}) => {

  return (
    <>
      <Sidebar
        appendTo={document.getElementById("auction")}
        className={styles.sideBar}
        visible={chatVisible}
        position="bottom"
        onHide={() => chatVisibleHandlerFalse()}
      >
        <ChatList chatVisible={chatVisible}/>
        <ChatInputText client={client} auctionId={auctionId}/>
      </Sidebar>
    </>
  );
};

export default ChatSideBar;
