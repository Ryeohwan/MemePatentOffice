import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {Client} from "@stomp/stompjs";
import AuctionCanvas from "components/auction/main/AuctionCanvas";
import styles from "pages/AuctionPage.module.css";
import { chatActions } from "store/chat";
import { auctionActions } from "store/auction";
import { playersInfo } from "store/auction";
// const ENDPOINT = process.env.NODE_ENV!==null?"wss://j8a305.p.ssafy.io/ws":"ws://localhost:8072/ws"
const ENDPOINT = "ws://localhost:8072/ws"
const AuctionPage: React.FC = () => {
  // const characters= useRef<playersInfo[]>([])
  const [characters,setCharacters]= useState<playersInfo[]>([])
  const [userNum,setUserNum] = useState<number>(0)

  const userId = JSON.parse(sessionStorage.getItem('user')!).userId
  const userNickName = JSON.parse(sessionStorage.getItem('user')!).nickname
  const {auctionId} = useParams();
  const client = useRef<Client>()
  const dispatch = useDispatch()
  
  
  const connect = () => {
    client.current = new Client({
      //   주소
      brokerURL: ENDPOINT,

      //   연결 확인
      // debug: function (str) {
      //   console.log(str);
      // },

      // 재연결 시도
      reconnectDelay: 3000,
      heartbeatIncoming: 2000,
      heartbeatOutgoing: 2000,
      // 연결
      onConnect: (frame) => {
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
        // console.log(json_body)
        dispatch(
            chatActions.sendChat({
              chat: { 
                id: json_body.nickname,
                message: json_body.message,
                time:  json_body.createdAt},
            })
          );
    });
    client.current.subscribe(
      `/sub/character/${auctionId}`,
      (body) => {
        const json_body = JSON.parse(body.body)
        const character = characters.find((c) => c.nickname === json_body.nickname) 
        if(character) {
          character.x = json_body.x
          character.y = json_body.y
          character.z = json_body.z
          character.status = json_body.status
        }
        else{
          setCharacters((prev) => [...prev, json_body])
          setUserNum((prev)=>prev+1)
        }
      }
    )
    console.log(`subscribe()`)
  };

  useEffect(() => {
      // dispatch(auctionActions.getAuctionInfo()) // redux에 있는 api 실행
    connect();

    return () => disconnect();
  }, []);
  return (
    <>
      <AuctionCanvas client={client} auctionId={Number(auctionId)} characters={characters} userNum={userNum}/>
    </>
  );
};

export default AuctionPage;
