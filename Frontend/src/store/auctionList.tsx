import { createSlice } from "@reduxjs/toolkit";

export type auctionType = {
  memeId: number;
  auctionId: number;
  title: string;
  finishTime: string;
  highestBid: number;
  imgUrl: string;
}

interface initialStateInterface {
  auctionNewList: auctionType[];
  auctionPopularList: auctionType[];
  auctionDeadlineList: auctionType[];
}

const initialState: initialStateInterface = {
  auctionNewList: [],
  auctionPopularList: [],
  auctionDeadlineList: []
};

const auctionListSlice = createSlice({
  name: "auctionList",
  initialState: initialState,
  reducers: {
    getAuctionNewList: (state, actions) => {
      state.auctionNewList = actions.payload
    },
    getAuctionPopularList: (state, actions) => {
      state.auctionPopularList = actions.payload
    },
  },
});

export const auctionListActions = auctionListSlice.actions;
export default auctionListSlice.reducer;
