import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch, AppThunk } from "./configStore";
import { getRemainTime } from 'components/common/card/NftAuctionCard';

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
