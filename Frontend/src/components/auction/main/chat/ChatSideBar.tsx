import React from "react";

import ChatInputText from "./ChatInputText";
import ChatList from "./ChatList";

import { Sidebar } from "primereact/sidebar";
import styles from "components/auction/main/chat/ChatSideBar.module.css";

interface ChatSideBarProps {
  chatVisible: boolean;
  chatVisibleHandlerFalse: () => void;
}

const ChatSideBar: React.FC<ChatSideBarProps> = ({
  chatVisible,
  chatVisibleHandlerFalse,
}) => {
  return (
    <>
      <Sidebar
        className={styles.sideBar}
        visible={chatVisible}
        position="bottom"
        onHide={() => chatVisibleHandlerFalse()}
      >
        <ChatList />
        <ChatInputText />
      </Sidebar>
    </>
  );
};

export default ChatSideBar;
