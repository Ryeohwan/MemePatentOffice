import { createSlice } from "@reduxjs/toolkit";
import sang from "assets/sang.gif";

export type biddingHistory = {
    nickname: string,
    SSF: number,
    time: string
}

export type auctionInfo = {
    memeId: number,
    sellerNickname : string,
    topPrice : number,
    finishTime: string,
    memeImgSrc: string,
}

export type playersInfo = {
    nickname: string,
    x: number,
    y: number,
    z: number,
    status: string, 
}


interface initialStateInterface {
    biddingHistory:biddingHistory[],
    playerState: number, // 0: default, 1: moving, 2: sitting, 3:handsup, 4: standup
    auctionInfo: auctionInfo,
    playersInfo: playersInfo[]
}

const initialState: initialStateInterface = {
    biddingHistory: [
        {nickname:'3반 CA 김재준', SSF:1230, time: "2023.04.08 18:34"},
        {nickname:'단발머리 부엉이', SSF:1220, time: "2023.04.08 18:32"},
        {nickname:'3반 CA 김재준', SSF:1210, time: "2023.04.08 18:25"},
        {nickname:'단발머리 부엉이', SSF:1200, time: "2023.04.08 18:18"},
        {nickname:'3반 CA 김재준', SSF:1190, time: "2023.04.08 18:15"},
        {nickname:'단발머리 부엉이', SSF:1180, time: "2023.04.08 18:03"},
        {nickname:'3반 CA 김재준', SSF:1170, time: "2023.04.08 17:30"},
        {nickname:'조명오', SSF:1160, time: "2023.04.08 15:20"},
        {nickname:'3반 CA 김재준', SSF:1150, time: "2023.04.08 09:11"},
        {nickname:'조명오', SSF:1140, time: "2023.04.08 09:10"},
        {nickname:'3반 CA 김재준', SSF:1100, time: "2023.04.08 09:09"},
        {nickname:'조명오', SSF:1000, time: "2023.04.08 09:06"},
        {nickname:'3반 CA 김재준', SSF:950, time: "2023.04.08 09:05"},
    ],
    playerState: 0,
    auctionInfo:{
        memeId: 1,
        sellerNickname:"3반 김재준",
        topPrice: 238478,
        finishTime: new Date(2023, 2, 30, 9, 7, 0, 0).toISOString(),
        memeImgSrc: sang,
    },
    playersInfo: []
};

const auctionSlice = createSlice({
  name: "auction",
  initialState: initialState,
  reducers: {
    closeAuction: (state) => {
        state.playerState = 0
        state.biddingHistory = []
    },
    getAuctionInfo: (state, actions) => {
        state.auctionInfo = actions.payload // api 통신 가져오기
    },
    getBiddingHistory: (state, actions) => {
        state.biddingHistory = actions.payload
    },
    putBiddingHistory:(state,actions) => {
        state.biddingHistory = [actions.payload, ...state.biddingHistory]
    },
    controlPlayerState: (state, actions) => {
        state.playerState = actions.payload
    },
    getPlayersInfo: (state, actions) => {
        state.playersInfo = actions.payload
    }
},
});

export const auctionActions = auctionSlice.actions;
export default auctionSlice.reducer;