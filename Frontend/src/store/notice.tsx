import { createSlice } from "@reduxjs/toolkit";

export type noticeObject = {
  id: number; // 경매 or 밈 id
  commentId: number | null; // 대댓글일 경우 댓글의 id까지 필요
  title: string; // 알림 받은 밈의 이름
  type: string; // 알림이 댓글 or 대댓글 or 경매 시작 or 경매 끝 or 경매 등록
  // string, number는 백엔드랑 얘기
  nickname: string | null; // 상대방의 nickname (경매일때 null)
  profileSrc: string | null; // 상대방의 프로필 사진 src (경매일때 null)
  memeSrc: string; // 밈 사진 src
  date: Date; // 받은 시간
};

interface initialStateInterface {
  // 나중에 api 받았을 때 필터링해서 today에 넣을지, week에 넣을지 month에 넣을지
  today: noticeObject[];
  week: noticeObject[];
  month: noticeObject[];
}

const initialState: initialStateInterface = {
  today: [
    {
      id: 1,
      title: "우는 페페",
      commentId:null,
      type: "reply",
      nickname: "3반 김재준",
      profileSrc: "totoro.jpg",
      memeSrc: "totoro.jpg",
      date: new Date(2023, 2, 24, 16, 0, 0),
    },
    {
      id: 1,
      title: "우는 페페",
      commentId:null,
      type: "auctionFinish",
      nickname: null,
      profileSrc: null,
      memeSrc: "totoro.jpg",
      date: new Date(2023, 2, 24, 18, 0, 0),
    },
    {
      id: 1,
      title: "우는 페페",
      commentId:null,
      type: "auctionStart",
      nickname: null,
      profileSrc: null,
      memeSrc: "totoro.jpg",
      date: new Date(2023, 2, 24, 16, 0, 0),
    },
    {
      id: 1,
      title: "우는 페페",
      commentId:null,
      type: "comment",
      nickname: "3반 김재준",
      profileSrc: "totoro.jpg",
      memeSrc: "totoro.jpg",
      date: new Date(2023, 2, 24, 16, 0, 0),
    },
    {
      id: 1,
      title: "우는 페페",
      commentId:null,
      type: "auctionReg",
      nickname: null,
      profileSrc: null,
      memeSrc: "totoro.jpg",
      date: new Date(2023, 2, 24, 16, 0, 0),
    },
    {
      id: 1,
      title: "우는 페페",
      commentId:null,
      type: "comment",
      nickname: "3반 김재준",
      profileSrc: "totoro.jpg",
      memeSrc: "totoro.jpg",
      date: new Date(2023, 2, 24, 16, 0, 0),
    },
  ],
  week: [
    {
      id: 1,
      title: "우는 페페",
      commentId:null,
      type: "comment",
      nickname: "3반 김재준",
      profileSrc: "totoro.jpg",
      memeSrc: "totoro.jpg",
      date: new Date(2023, 2, 18, 16, 0, 0),
    },
    {
      id: 1,
      title: "우는 페페",
      commentId:null,
      type: "comment",
      nickname: "3반 김재준",
      profileSrc: "totoro.jpg",
      memeSrc: "totoro.jpg",
      date: new Date(2023, 2, 18, 16, 0, 0),
    },
  ],
  month: [
    {
      id: 1,
      title: "우는 페페",
      commentId:null,
      type: "comment",
      nickname: "3반 김재준",
      profileSrc: "totoro.jpg",
      memeSrc: "totoro.jpg",
      date: new Date(2023, 1, 27, 16, 0, 0),
    },
    {
      id: 1,
      title: "우는 페페",
      commentId:null,
      type: "comment",
      nickname: "3반 김재준",
      profileSrc: "totoro.jpg",
      memeSrc: "totoro.jpg",
      date: new Date(2023, 1, 27, 16, 0, 0),
    },
    {
      id: 1,
      title: "우는 페페",
      commentId:null,
      type: "comment",
      nickname: "3반 김재준",
      profileSrc: "totoro.jpg",
      memeSrc: "totoro.jpg",
      date: new Date(2023, 1, 27, 16, 0, 0),
    },
    {
      id: 1,
      title: "우는 페페",
      commentId:null,
      type: "comment",
      nickname: "3반 김재준",
      profileSrc: "totoro.jpg",
      memeSrc: "totoro.jpg",
      date: new Date(2023, 1, 27, 16, 0, 0),
    },
  ],
};

const noticeSlice = createSlice({
  name: "notice",
  initialState: initialState,
  reducers: {
    // 나중에 api 보냈을때 사용할 dispatch
    getNotice: (state, actions) => {
      state.today = [...state.today, actions.payload.today];
      state.week = [...state.week, actions.payload.week];
      state.month = [...state.month, actions.payload.month];
    },
  },
});

export const noticeActions = noticeSlice.actions;
export default noticeSlice.reducer;
