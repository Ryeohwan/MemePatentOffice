import {Client} from "@stomp/stompjs";
import { playersInfo } from "store/auction";
export interface WebSocketProps{
  client: React.MutableRefObject<Client|undefined>
  auctionId: number
}

export interface Characters extends WebSocketProps{
  characters: playersInfo[]
  userNum: number
}