import { createSlice } from "@reduxjs/toolkit";
import sang from "assets/sang.gif";

export type auctionCardType = {
  memeId: number;
  auctionId: number;
  title: string;
  finishTime: string;
  highestBid: number;
  imgUrl: string;
}

export type biddingHistory = {
  nickname: string;
  SSF: number;
  time: string;
};

export type auctionInfo = {
  memeId: number;
  sellerNickname: string;
  topPrice: number;
  finishTime: string;
  memeImgSrc: string;
};

export type playersInfo = {
  nickname: string;
  x: number;
  y: number;
  z: number;
  status: string;
  rotation_x: number;
  rotation_y: number;
  rotation_z: number;
};

interface initialStateInterface {
  biddingHistory: biddingHistory[];
  playerState: number; // 0: default, 1: moving, 2: sitting, 4:handsup, 3: standup
  auctionInfo: auctionInfo;
  playersInfo: playersInfo[];
  status: string;
}

const initialState: initialStateInterface = {
  biddingHistory: [
  ],
  playerState: 0,
  auctionInfo: {
    memeId: 1,
    sellerNickname: "3반 김재준",
    topPrice: 238478,
    finishTime: new Date(2023, 2, 30, 9, 7, 0, 0).toISOString(),
    memeImgSrc: sang,
  },
  playersInfo: [],
  status: "DEFAULT",
};

const auctionSlice = createSlice({
  name: "auction",
  initialState: initialState,
  reducers: {
    closeAuction: (state) => {
      state.playerState = 0;
      state.biddingHistory = [];
    },
    openAuction: (state) => {
      state.playerState = 0;
      state.biddingHistory = [];
      state.status = "DEFAULT";
      state.auctionInfo = {
        memeId: 1,
        sellerNickname: "3반 김재준",
        topPrice: 238478,
        finishTime: new Date(2023, 2, 30, 9, 7, 0, 0).toISOString(),
        memeImgSrc: sang,
      };
    },
    getAuctionInfo: (state, actions) => {
      state.auctionInfo = actions.payload; // api 통신 가져오기
    },
    getBiddingHistory: (state, actions) => {
      state.biddingHistory = actions.payload;
    },
    putBiddingHistory: (state, actions) => {
      state.biddingHistory = [actions.payload, ...state.biddingHistory];
    },
    controlPlayerState: (state, actions) => {
      state.playerState = actions.payload;
    },
    getPlayersInfo: (state, actions) => {
      state.playersInfo = actions.payload;
    },
    changeStatus: (state, actions) => {
      state.status = actions.payload;
    },
  },
});

export const auctionActions = auctionSlice.actions;
export default auctionSlice.reducer;
