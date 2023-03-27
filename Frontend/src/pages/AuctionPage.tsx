// 경매장 auction/:id
import React, { useEffect, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJs from "sockjs-client";
import AuctionCanvas from "components/auction/main/AuctionCanvas";

const ENDPOINT = "https://j8a305.p.ssafy.io/ws";
const AuctionPage: React.FC = () => {
  const socket = new SockJs(ENDPOINT);
  const stompClient = Stomp.over(socket);
  const connect = () => {
    stompClient.connect({}, onConnected, onError);
  };
  const onConnected = () => {
    console.log('success')
  };
  const onError = (error: any) => {
    console.error(error);
  };
  // 연결 끊기
  const disconnect = () => {
    console.log("연결이 끊어졌습니다.");
  };

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  return (
    <>
      <AuctionCanvas />
    </>
  );
};

export default AuctionPage;

//   const client = useRef<StompJs.Client>();
// client.current = new StompJs.Client({
// 주소
//   brokerURL: ENDPOINT,

// 연결 확인
//   debug: function (str) {
// console.log(str);
//   },

// 재연결 시도
//   reconnectDelay: 3000,
//   heartbeatIncoming: 2000,
//   heartbeatOutgoing: 2000,

//   // 연결
//   onConnect: () => {
//     console.log("success");
//   },

//   onStompError: (frame) => {
//     console.log(frame)
//   },
// });

// client.current.activate()
// if (client.current?.connected) {
//   client.current?.deactivate();
// }
