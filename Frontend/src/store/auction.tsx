import { createSlice } from "@reduxjs/toolkit";

interface initialStateInterface {
    biddingHistory:{
        nickname: string,
        SSF: number,
        time: string
    }[]
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
    ]
};

const auctionSlice = createSlice({
  name: "auction",
  initialState: initialState,
  reducers: {
    getBiddingHistory: (state, actions) => {
        state.biddingHistory = actions.payload
    }
  },
});

export const chatActions = auctionSlice.actions;
export default auctionSlice.reducer;
