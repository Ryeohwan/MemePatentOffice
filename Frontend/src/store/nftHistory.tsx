import { createSlice } from "@reduxjs/toolkit";

// 나중에 지울거 더미 데이터를 위해 임시
//--------------------------------
import haku from "assets/haku.png";
import kakao from "assets/kakao.png";
import logo from "assets/logo.png";
import auction from "assets/auction.png";
import check from "assets/icon_check.png";
// ------------------------------
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
  myHistoryList: [
    {
      id: 1,
      title: "하쿠",
      seller: "갓이별한조씨",
      imgSrc: haku,
      price: 302,
      date: new Date(2023, 2, 25, 16, 0, 0).toISOString(),
    },
    {
      id: 2,
      title: "파란 토끼",
      seller: "5조 햇살",
      imgSrc: logo,
      price: 39842,
      date: new Date(2023, 2, 25, 15, 0, 0).toISOString(),
    },
    {
      id: 3,
      title: "망치",
      seller: "조명오",
      imgSrc: auction,
      price: 323,
      date: new Date(2023, 2, 24, 16, 0, 0).toISOString(),
    },
    {
      id: 4,
      title: "체크 밈 ㅎㅎ",
      seller: "3반 김재준",
      imgSrc: check,
      price: 33,
      date: new Date(2023, 2, 23, 16, 0, 0).toISOString(),
    },
    {
      id: 5,
      title: "카카오 로고 밈",
      seller: "류동은",
      imgSrc: kakao,
      price: 783,
      date: new Date(2023, 2, 22, 16, 0, 0).toISOString(),
    },
  ],
};

const nftHistorySlice = createSlice({
  name: "auctionUpload",
  initialState: initialState,
  reducers: {
    openPage: (state) => {
      state.myHistoryList = [] // 페이지 열었을 때 초기화
    },
    getNftHistory: (state, actions) => {
      state.myHistoryList = [...state.myHistoryList, actions.payload] // api처리때 사용할 action
    }
  },
});

export const nftHistoryActions = nftHistorySlice.actions;
export default nftHistorySlice.reducer;
