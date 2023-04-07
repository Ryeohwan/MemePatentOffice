
import { createSlice } from "@reduxjs/toolkit";

export type memeList = {
  id: number;
  title: string;
  imgUrl: string;
};

export type submitMeme = {
  sellerId: number | null;
  memeId: number | null;
  startDateTime: Date | null;
  startingPrice: number | null;
  
};

interface initialStateInterface {
  submitMeme: submitMeme;
}

const initialState: initialStateInterface = {
  submitMeme: { sellerId:null , memeId: null, startDateTime: null, startingPrice: null },
};

const auctionUploadSlice = createSlice({
  name: "auctionUpload",
  initialState: initialState,
  reducers: {
    // 모달 껏다 키기
    controlModal: (state, actions) => {
      // actions 보낼때 객체로 보내줘야함 {id:meme,visible:true} or {visible:true} or {visible:false}
      state.submitMeme = {sellerId: actions.payload.sellerId, memeId : actions.payload.memeid, startDateTime:null, startingPrice:null}
      if (!actions.payload.visible) {
        state.submitMeme = { sellerId:null, memeId: null, startDateTime: null, startingPrice: null }
      }
    },
    // 상세 페이지에서 버튼을 누르면 선택된 밈이 default
    selectMeme: (state, actions) => {
      state.submitMeme.memeId = actions.payload; // payload = 밈의 id값
    },
    selectTime: (state, actions) => {
      state.submitMeme.startDateTime = actions.payload // payload = 시간
    },
    selectPrice: (state, actions) => {
      state.submitMeme.startingPrice = actions.payload
    }
  },
});

export const auctionUploadActions = auctionUploadSlice.actions;
export default auctionUploadSlice.reducer;