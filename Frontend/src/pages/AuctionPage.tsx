import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {Client} from "@stomp/stompjs";
import AuctionCanvas from "components/auction/main/AuctionCanvas";
import styles from "pages/AuctionPage.module.css";
import { chatActions } from "store/chat";

const ENDPOINT = process.env.NODE_ENV!==null?"wss://j8a305.p.ssafy.io/ws":"ws://localhost:8072/ws"

const AuctionPage: React.FC = () => {

  const userId = 1 //JSON.parse(sessionStorage.getItem('user')).userId
  const userNickName = "조현철"//JSON.parse(sessionStorage.getItem('user')).nickname
  const {auctionId} = useParams();
  const client = useRef<Client>()

  const dispatch = useDispatch()
  
  
  const connect = () => {
    console.log("connect()")
    client.current = new Client({
      //   주소
      brokerURL: ENDPOINT,

      //   연결 확인
      debug: function (str) {
        console.log(str);
      },

      // 재연결 시도
      reconnectDelay: 3000,
      heartbeatIncoming: 2000,
      heartbeatOutgoing: 2000,
      // 연결
      onConnect: (frame) => {
        console.log(frame);
        subscribe();
      },

      onStompError: (frame) => {
        console.log(frame);
      },
      
    })
    client.current.activate()
  };

  // 연결 끊기
  const disconnect = () => {
    console.log("연결이 끊어졌습니다.");
  };

  const subscribe = () => {
    if(client.current == null){
      console.log("subscribe: client.current is null")
      return
    }
    client.current.subscribe(
      `/sub/chat/${auctionId}`, 
      (body) => {
        const json_body = JSON.parse(body.body)
        console.log(json_body)
        dispatch(
            chatActions.sendChat({
              chat: { 
                id: json_body.nickname,
                message: json_body.message,
                time:  json_body.createdAt},
            })
          );
    });
    console.log(`subscribe()`)
  };

  const sendChat = () => {
    if(!client.current?.connected){
      console.log('sendSub: client.current is not connected')
      return
    }
    client.current.publish({
      destination: "/pub/chat",
      body: JSON.stringify({ 
        auctionId: auctionId,
        userId: userId,
        message: "Hello, world!",
      }),
    });

  };

  useEffect(() => {
      // dispatch(auctionActions.getAuctionInfo()) // redux에 있는 api 실행
    connect();

    return () => disconnect();
  }, []);

  return (
    <>
      <AuctionCanvas client={client} auctionId={Number(auctionId)}/>;
      <button onClick={sendChat} className={styles.btn}>
        보내다
      </button>
    </>
  );
};

export default AuctionPage;
