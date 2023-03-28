// 경매장 auction/:id
import React, { useEffect, useRef } from "react";
import * as StompJs from "@stomp/stompjs";
import AuctionCanvas from "components/auction/main/AuctionCanvas";

import styles from "pages/AuctionPage.module.css";

// const ENDPOINT = "wss://j8a305.p.ssafy.io/ws";

const ENDPOINT = "ws://localhost:3072/ws";
const AuctionPage: React.FC = () => {
  // const client = useRef<StompJs.Client>();
  // const connect = () => {
  //   client.current = new StompJs.Client({
  //     //   주소
  //     brokerURL: ENDPOINT,

  //     //   연결 확인
  //     debug: function (str) {
  //       console.log(str);
  //     },

  //     // 재연결 시도
  //     reconnectDelay: 3000,
  //     heartbeatIncoming: 2000,
  //     heartbeatOutgoing: 2000,
  //     // 연결
  //     onConnect: (frame) => {
  //       console.log(frame);
  //       if (client.current !== null)
  //       subscribe();
  //     },

  //     onStompError: (frame) => {
  //       console.log(frame);
  //     },
      
  //   });
  //   client.current?.activate();
  // };

  // // 연결 끊기
  // const disconnect = () => {
  //   console.log("연결이 끊어졌습니다.");
  // };

  // const subscribe = () => {
  //   client.current?.subscribe("/pub", (message) => {
  //     console.log(`/pub recieved: ${message.body}`);
  //   });
  // };

  // const sendSub = () => {
  //     console.log(client.current)
  //   if (client.current?.connected) {
  //     client.current?.publish({
  //       destination: "/sub",
  //       body: JSON.stringify({ message: "Hello, world!" }),
  //     });
  //   } else {
  //     console.log("서버에 연결되지 않았습니다.");
  //   }
  // };

  // useEffect(() => {
  //   connect();
  //   return () => disconnect();
  // }, []);

  return (
    <>
      <AuctionCanvas />;
      {/* <button onClick={sendSub} className={styles.btn}>
        보내다
      </button> */}
    </>
  );
};

export default AuctionPage;
