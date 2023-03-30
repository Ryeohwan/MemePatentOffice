import {Client} from "@stomp/stompjs";

export interface WebSocketProps{
  client: React.MutableRefObject<Client|undefined>
  auctionId: number
}