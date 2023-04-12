import { createSlice } from "@reduxjs/toolkit";

export type myHistoryList = {
  id: number;
  title: string;
  seller: string;
  price: number;
  imgSrc: string;
  date: string;
};

interface initialStateInterface {
  myHistoryList: myHistoryList[];
}

const initialState: initialStateInterface = {
  myHistoryList: [],
};

const nftHistorySlice = createSlice({
  name: "nftHistory",
  initialState: initialState,
  reducers: {
    resetPage: (state) => {
      state.myHistoryList = []; // 페이지 열었을 때 초기화
    },
    getNftHistory: (state, actions) => {
      state.myHistoryList = [...state.myHistoryList, actions.payload]; // api처리때 사용할 action
    },
  },
});

export const nftHistoryActions = nftHistorySlice.actions;
export default nftHistorySlice.reducer;
