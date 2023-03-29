import { createSlice } from "@reduxjs/toolkit";

// 나중에 지울거 더미 데이터를 위해 임시
//--------------------------------
import haku from "assets/haku.png";
import kakao from "assets/kakao.png";
import logo from "assets/logo.png";
import auction from "assets/auction.png"
import check from "assets/icon_check.png"
// ------------------------------
export type memeList = {
  id: number;
  title: string;
  imgSrc: string;
};

export type submitMeme = {
  id: number | null;
  auctionDate: Date | null;
  lowPrice: number | null;
};

interface initialStateInterface {
  isVisible: boolean;
  memeList: memeList[];
  submitMeme: submitMeme;
}

const initialState: initialStateInterface = {
  isVisible: false,
  memeList: [
    { id: 1, title: "하쿠", imgSrc: haku },
    { id: 2, title: "카카오", imgSrc: kakao },
    { id: 3, title: "파란 토끼", imgSrc: logo },
    { id: 4, title: "망치", imgSrc: auction },
    { id: 5, title: "체크 밈 ㅎㅎ", imgSrc: check },
  ],
  submitMeme: { id: null, auctionDate: null, lowPrice: null },
};

const auctionUploadSlice = createSlice({
  name: "auctionUpload",
  initialState: initialState,
  reducers: {
    // 모달 껏다 키기
    controlModal: (state, actions) => {
      // actions 보낼때 객체로 보내줘야함 {id:meme,visible:true} or {visible:true} or {visible:false}
      state.submitMeme = {id : actions.payload.memeid, auctionDate:null, lowPrice:null}
      state.isVisible = actions.payload.visible; // payload = true or false
      if (!actions.payload.visible) {
        state.submitMeme = { id: null, auctionDate: null, lowPrice: null }
      }
    },
    // 상세 페이지에서 버튼을 누르면 선택된 밈이 default
    selectMeme: (state, actions) => {
      state.submitMeme.id = actions.payload; // payload = 밈의 id값
    },
    selectTime: (state, actions) => {
      state.submitMeme.auctionDate = actions.payload // payload = 시간
    },
    selectPrice: (state, actions) => {
      state.submitMeme.lowPrice = actions.payload
    }
  },
});

export const auctionUploadActions = auctionUploadSlice.actions;
export default auctionUploadSlice.reducer;
