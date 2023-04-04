import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {Client} from "@stomp/stompjs";
import AuctionCanvas from "components/auction/main/AuctionCanvas";
import styles from "pages/AuctionPage.module.css";
import { chatActions } from "store/chat";
import { auctionActions } from "store/auction";
import { playersInfo } from "store/auction";
import useAxios from "hooks/useAxios";
// const ENDPOINT = process.env.NODE_ENV !== null?"wss://j8a305.p.ssafy.io/ws":"ws://localhost:8072/ws"
const ENDPOINT = "ws://localhost:8072/ws"
const AuctionPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const characters= useRef<playersInfo[]>([])
  const [userNum,setUserNum] = useState<number>(0)
  const {data, sendRequest} = useAxios()
  const userId = JSON.parse(sessionStorage.getItem('user')!).userId
  const userNickName = JSON.parse(sessionStorage.getItem('user')!).nickname
  const {auctionId} = useParams();
  const client = useRef<Client>()
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(auctionActions.openAuction())
  },[])
  const connect = () => {
    client.current = new Client({
      //   주소
      brokerURL: ENDPOINT,

        // 연결 확인
      debug: function (str) {
        console.log(str);
      },

      // 재연결 시도
      reconnectDelay: 3000,
      heartbeatIncoming: 2000,
      heartbeatOutgoing: 2000,
      // 연결
      onConnect:async (frame) => {
        await sendRequest({url:`/api/auction/info?auctionId=${auctionId}`})
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
    client.current?.publish({
      destination: "/pub/character",
      body: JSON.stringify({
        auctionId: auctionId,
        nickname: JSON.parse(sessionStorage.getItem('user')!).nickname,
        x: -100,
        y: -100,
        z: -100,
        rotation_x: 0,
        rotation_y: 0,
        rotation_z: 0,
        status: "DEFAULT"
      })
    })
    client.current?.deactivate()
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
        const character = characters.current.find((c) => c.nickname===json_body.nickname) 
        if(character) {
          character.x = json_body.x
          character.y = json_body.y
          character.z = json_body.z
          character.rotation_x = json_body.rotation_x
          character.rotation_y = json_body.rotation_y
          character.rotation_z = json_body.rotation_z
          character.status = json_body.status
        }
        else{
          characters.current.push(json_body)
          setUserNum((prev)=>prev+1)
        }
      }
    )
    client.current.subscribe(
      `/sub/bid/${auctionId}`,
      (body) => {
        const json_body = JSON.parse(body.body)
        console.log(json_body)
      }
    )
    console.log(`subscribe()`)
  };

  useEffect(()=>{
    if(data){
      console.log(data)
      dispatch(auctionActions.getAuctionInfo(data))
      setIsLoading(false)
    }
  },[data])

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    }
  }, []);
  return (
    <>
    {isLoading && <p>loading,,,</p>}
    {!isLoading && 
      <AuctionCanvas client={client} auctionId={Number(auctionId)} characters={characters} userNum={userNum}/>
    }
    </>
  );
};

export default AuctionPage;
