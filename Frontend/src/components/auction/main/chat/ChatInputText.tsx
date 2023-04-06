import React, { KeyboardEventHandler, useState } from "react";
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
  const [value,setState] = useState<string>('')
  const inputChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // dispatch(chatActions.inputText({ input: e.target.value }));
    setState(e.target.value)
      };

  const sendMessageHandler = (value: string) => {
    if (value.trim()) {
      if(!client.current?.connected){
        return
      }
      client.current.publish({
        destination: "/pub/chat",
        body: JSON.stringify({ 
          auctionId: auctionId,
          nickname: JSON.parse(sessionStorage.getItem('user')!).nickname,
          message: value,
          profileImgUrl: JSON.parse(sessionStorage.getItem('user')!).imgUrl,
        }),
      });
      setState('')
    }
  };
  const keyUpHandler:KeyboardEventHandler<HTMLTextAreaElement> = (e)=> {
    if(e.nativeEvent.key!=="Enter") return
    if (value.trim()) {
      if(!client.current?.connected){
        return
      }
      client.current.publish({
        destination: "/pub/chat",
        body: JSON.stringify({ 
          auctionId: auctionId,
          nickname: JSON.parse(sessionStorage.getItem('user')!).nickname,
          message: value,
          profileImgUrl: JSON.parse(sessionStorage.getItem('user')!).imgUrl,
        }),
      });
      setState('')

    }
  };  
  return (
    <div className={styles.wrapper}>
      <InputTextarea
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          inputChangeHandler(e)
        }
        onKeyUp={keyUpHandler}
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
