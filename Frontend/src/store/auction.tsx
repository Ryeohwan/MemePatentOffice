import { createSlice } from "@reduxjs/toolkit";

export type biddingHistory = {
  nickname: string;
  price: number;
  time: string;
};

export type auctionInfo = {
  sellerNickname: string | null;
  startingPrice: number | null;
  finishTime: string | null;
  biddingHistory: biddingHistory[];
  memeImgUrl: string | null;
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
  biddingHistory: [],
  playerState: 0,
  auctionInfo: {
    sellerNickname: null,
    startingPrice: null,
    finishTime: null,
    biddingHistory: [],
    memeImgUrl: null,
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
        sellerNickname: null,
        startingPrice: null,
        finishTime: null,
        biddingHistory: [],
        memeImgUrl:null,
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
