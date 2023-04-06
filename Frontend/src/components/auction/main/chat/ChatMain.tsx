import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/configStore";
import { chatActions } from "store/chat";

import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import ChatSideBar from "./ChatSideBar";
import { WebSocketProps } from "type";
import styles from "components/auction/main/chat/ChatMain.module.css";

const ChatMain: React.FC<WebSocketProps> = ({
  seeChat,
  seeChatHandler,
  client,
  auctionId,
}) => {
  const dispatch = useDispatch();
  const [chatVisible, setChatVisible] = useState<boolean>(false);
  const chatcnt = useSelector<RootState, number>((state) => state.chat.chatcnt);

  const chatVisibleHandlerTrue = () => {
    setChatVisible(true);
    seeChatHandler();
    dispatch(chatActions.resetChatcnt());
  };
  const chatVisibleHandlerFalse = () => {
    setChatVisible(false);
    dispatch(chatActions.isNotLooking());
  };
  return (
    <>
      {seeChat ? (
        <>
          <Button className={styles.chatBtn} onClick={chatVisibleHandlerTrue}>
            <i className="pi pi-comment p-overlay-badge" style={{ fontSize: '1.5rem' }}>
              <Badge value={`${chatcnt}`} severity="danger"></Badge>
            </i>
          </Button>
        </>
      ) : (
        <>
          <Button className={styles.chatBtn} onClick={chatVisibleHandlerTrue}>
            <i className="pi pi-comment p-overlay-badge" style={{ fontSize: '1.5rem' }}>
              <Badge value="0"></Badge>
            </i>
          </Button>
        </>
      )}
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
