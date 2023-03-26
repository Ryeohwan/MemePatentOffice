import { createSlice } from "@reduxjs/toolkit";

// 나중에 지울거 더미 데이터를 위해 임시
//--------------------------------
import haku from "assets/haku.png";
import kakao from "assets/kakao.png";
import logo from "assets/logo.png";
// ------------------------------
export type myCommentList = {
  memeId: number; // 댓글이 달린 밈id
  commentId: number; // 댓글 id
  replyId: number | null; // 대댓글 id(댓글인 경우 null)
  comment: string; // 댓글 내용
  title: string; // 밈의 이름
  imgSrc: string; // 밈 사진
  date: string; // 댓글 단 시간
};

interface initialStateInterface {
  today: myCommentList[];
  week: myCommentList[];
  month: myCommentList[];
}

const initialState: initialStateInterface = {
  // 더미 데이터
  today: [
    {
      memeId: 1,
      commentId: 1,
      replyId: null,
      comment: "이 밈 내꺼 아잉겨~~",
      title: "하쿠",
      imgSrc: haku,
      date: new Date(2023, 2, 25, 16, 0, 0).toISOString(),
    },
    {
      memeId: 1,
      commentId: 2,
      replyId: null,
      comment: "하쿠가 어디서 나옵니까,,",
      title: "하쿠",
      imgSrc: haku,
      date: new Date(2023, 2, 25, 15, 32, 0).toISOString(),
    },
    {
      memeId: 2,
      commentId: 3,
      replyId: null,
      comment: "이 밈 인정입니다 인정~",
      title: "파란 토끼",
      imgSrc: logo,
      date: new Date(2023, 2, 25, 12, 10, 0).toISOString(),
    },
  ],
  week: [
    {
      memeId: 3,
      commentId: 4,
      replyId: null,
      comment: "카카오 팔렸네;;",
      title: "카카오 로고 밈",
      imgSrc: kakao,
      date: new Date(2023, 2, 22, 12, 10, 0).toISOString(),
    },
  ],
  month: [
    {
      memeId: 3,
      commentId: 5,
      replyId: null,
      comment: "카카오 아잉겨~",
      title: "카카오 로고 밈",
      imgSrc: kakao,
      date: new Date(2023, 2, 1, 12, 10, 0).toISOString(),
    },
  ],
};

const historySlice = createSlice({
  name: "auctionUpload",
  initialState: initialState,
  reducers: {
    openPage: (state) => {
      state.today = []; // 페이지 열었을 때 초기화
      state.week = []; // 페이지 열었을 때 초기화
      state.month = []; // 페이지 열었을 때 초기화
    },
  },
});

export const historyActions = historySlice.actions;
export default historySlice.reducer;
