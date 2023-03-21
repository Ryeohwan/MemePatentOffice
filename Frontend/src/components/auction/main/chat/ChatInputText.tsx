import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "store/chat";
import { RootState } from "store/configStore";

import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import styles from "components/auction/main/chat/ChatInputText.module.css";

const ChatInputText: React.FC = () => {
  const dispatch = useDispatch();
  const value = useSelector<RootState, string>((state) => state.chat.input);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(chatActions.inputText({ input: e.target.value }));
  };

  const sendMessageHandler = (value: string) => {
    const offset = 1000 * 60 * 60 * 9
    const date = new Date((new Date()).getTime() + offset).toISOString();
    const newDate = date.split("T");
    const time = newDate[1].split(':')
    const formatTime = `${newDate[0]}-${time[0]}-${time[1]}`
    dispatch(chatActions.sendChat({chat:{id:"조명오", message:value, time:formatTime}}))
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
