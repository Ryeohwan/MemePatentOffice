import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "store/chat";
import { RootState } from "store/configStore";

import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import styles from "components/auction/main/chat/ChatInputText.module.css";
import { WebSocketProps } from "type";
// import {Client} from "@stomp/stompjs";

const ChatInputText: React.FC<WebSocketProps> = ({client, auctionId}) => {
  const dispatch = useDispatch();
  const value = useSelector<RootState, string>((state) => state.chat.input);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(chatActions.inputText({ input: e.target.value }));
      };

  const sendMessageHandler = (value: string) => {
    if (value.trim()) {
      if(!client.current?.connected){
        console.log('sendSub: client.current is not connected')
        return
      }
      console.log(JSON.parse(sessionStorage.getItem('user')!).imgUrl)
      client.current.publish({
        destination: "/pub/chat",
        body: JSON.stringify({ 
          auctionId: auctionId,
          nickname: JSON.parse(sessionStorage.getItem('user')!).nickname,
          message: value,
          profileImgUrl: JSON.parse(sessionStorage.getItem('user')!).imgUrl,
        }),
      });
      
    }
  };

  return (
    <div className={styles.wrapper}>
      <InputTextarea
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          inputChangeHandler(e)
        }
        rows={1}
        cols={36}
      />
      <Button
        icon="pi pi-send"
        onClick={() => {
          sendMessageHandler(value);
        }}
      />
    </div>
  );
};

export default ChatInputText;
