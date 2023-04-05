import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch, AppThunk } from "./configStore";
import { request } from "http";
import { getRemainTime } from 'components/common/card/NftAuctionCard';

// ------------------------------
// export type myCommentList = {
//   memeId: number; // 댓글이 달린 밈id
//   commentId: number; // 댓글 id
//   replyId: number | null; // 대댓글 id(댓글인 경우 null)
//   comment: string; // 댓글 내용
//   title: string; // 밈의 이름
//   imgSrc: string; // 밈 사진
//   date: string; // 댓글 단 시간
// };

export type myCommentList = {
  id: number; // 댓글 id
  memeId: number; // meme id
  memeTitle: string; // meme 이름
  memeImage: string; // 밈 이미지
  content: string; // 댓글 내용
  date: string; // 댓글 단 날짜
  parentId: number | null; // 댓글이면 null | 대댓글이면 parent id
};

interface initialStateInterface {
  today: myCommentList[];
  week: myCommentList[];
  previous: myCommentList[];
  hasNext: boolean;
  loading: boolean;
}

const initialState: initialStateInterface = {
  // 더미 데이터
  // today: [
  //   {
  //     memeId: 1,
  //     commentId: 1,
  //     replyId: null,
  //     comment: "이 밈 내꺼 아잉겨~~",
  //     title: "하쿠",
  //     imgSrc: haku,
  //     date: new Date(2023, 2, 25, 16, 0, 0).toISOString(),
  //   },
  //   {
  //     memeId: 1,
  //     commentId: 2,
  //     replyId: null,
  //     comment: "하쿠가 어디서 나옵니까,,",
  //     title: "하쿠",
  //     imgSrc: haku,
  //     date: new Date(2023, 2, 25, 15, 32, 0).toISOString(),
  //   },
  //   {
  //     memeId: 2,
  //     commentId: 3,
  //     replyId: null,
  //     comment: "이 밈 인정입니다 인정~",
  //     title: "파란 토끼",
  //     imgSrc: logo,
  //     date: new Date(2023, 2, 25, 12, 10, 0).toISOString(),
  //   },
  // ],
  // week: [
  //   {
  //     memeId: 3,
  //     commentId: 4,
  //     replyId: null,
  //     comment: "카카오 팔렸네;;",
  //     title: "카카오 로고 밈",
  //     imgSrc: kakao,
  //     date: new Date(2023, 2, 22, 12, 10, 0).toISOString(),
  //   },
  // ],
  // month: [
  //   {
  //     memeId: 3,
  //     commentId: 5,
  //     replyId: null,
  //     comment: "카카오 아잉겨~",
  //     title: "카카오 로고 밈",
  //     imgSrc: kakao,
  //     date: new Date(2023, 2, 1, 12, 10, 0).toISOString(),
  //   },
  // ],
  today: [],
  week: [],
  previous: [],
  hasNext: true,
  loading: false,
};

const historySlice = createSlice({
  name: "history",
  initialState: initialState,
  reducers: {
    // 페이지 열었을때 초기화
    openPage: (state) => {
      state.today = [];
      state.week = [];
      state.previous = [];
    },
    changeLoading: (state, actions) => {
      state.loading = actions.payload;
    },
    updateCommentList: (state, actions) => {
      state.hasNext = actions.payload.hasNext;
      if (actions.payload.lastCommentId === -1) {
        state.today = [];
        state.week = [];
        state.previous = [];
      }
      if (actions.payload.getList) {
        // getList 돌면서 date 확인 후 today or week or month 배열에 삽입
        actions.payload.getList.forEach((item: myCommentList) => {
          const targetTime = Math.floor(+new Date(item.date) / 1000);
          const remainTime = getRemainTime(targetTime)

          if (remainTime < 60 * 60 * 24) {
            state.today = [...state.today, item]
          } else if (remainTime < 60 * 60 * 24 * 7) {
            state.week = [...state.week, item]
          } else {
            state.previous = [...state.previous, item]
          }
        })
      }
    }
  },
});

export const getHistoryAxiosThunk = (lastRef: number): AppThunk =>
  async (dispatch) => {
    dispatch(historyActions.changeLoading(true));

    const sendRequest = async () => {
      const requestUrl = `${process.env.REACT_APP_HOST}/api/mpoffice/meme/comment/myComments?userId=${JSON.parse(sessionStorage.user).userId}` +
      (lastRef !== -1 ? `&idx=${lastRef}` : "");

      console.log('여기로 보낼거임', requestUrl)
      const response = await axios.get(requestUrl, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
        },
        validateStatus: (status) => status === 200 || status === 401,
      } )
      if (response.status === 401) {
        return false;
      } else {
        return response.data;
      }
    }
    try {
      const res = await sendRequest();
      console.log("comment get!", res);
      if (!res || res.empty) {
        dispatch(historyActions.changeLoading(false));
        return;
      }
      dispatch(historyActions.updateCommentList({
        getList: res.content,
        lastCommentId: lastRef,
        hasNext: !res.last,
      })
      );
    } catch (err) {
      console.log(err);    
    }
    dispatch(historyActions.changeLoading(false));
  };

export const historyActions = historySlice.actions;
export default historySlice.reducer;
