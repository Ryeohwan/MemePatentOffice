import {Client} from "@stomp/stompjs";
import { playersInfo } from "store/auction";
export interface WebSocketProps{
  client: React.MutableRefObject<Client|undefined>
  auctionId: number
}

export interface Characters extends WebSocketProps{
  characters: React.MutableRefObject<playersInfo[]>
  userNum: number
}

export type auctionInfo ={
  sellerNickname: string, // 판매자 닉네임
  startingPrice: number, // 경매 시작 최저가
  finishTime: string, // 중간에 'T'있는 형식
  biddingHistory: [{ // 입찰 내역
    nickname: string, // 입찰한 사람의 닉네임
    price: number, // 입찰 가격
    time: string,  // 중간에 'T'있는 형식
  },]
}
