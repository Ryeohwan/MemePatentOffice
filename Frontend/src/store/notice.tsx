import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch, AppThunk } from "./configStore";
import { getRemainTime } from 'components/common/card/NftAuctionCard';


export type noticeObject = {
  alarmId: number; // 알림 id
  type: string; // 알림이 댓글 or 대댓글 or 경매 시작 or 경매 끝 or 경매 등록
  memeId: number; //밈 id
  memeSrc: string; // 밈 사진 src
  title: string; // 알림 받은 밈의 이름
  date: Date|string; // 받은 시간
  
  auctionId: number | null; // 경매 관련이면 경매 id / 대댓글이면 댓글 id
  commentId: number | null; // 댓글이면 댓글 id / 대댓글이면 대댓글 id
  nickname: string | null; // 상대방의 nickname (경매일때 null)
  profileSrc: string | null; // 상대방의 프로필 사진 src (경매일때 null)
};

interface initialStateInterface {
  // 나중에 api 받았을 때 필터링해서 today에 넣을지, week에 넣을지 month에 넣을지
  today: noticeObject[];
  week: noticeObject[];
  previous: noticeObject[];
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

const noticeSlice = createSlice({
  name: "notice",
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
    updateNoticeList: (state, actions) => {
      state.hasNext = actions.payload.hasNext;
      if (actions.payload.lastNoticeId === -1) {
        state.today = [];
        state.week = [];
        state.previous = [];
      }
      if (actions.payload.getList) {
        // getList 돌면서 data 확인 후 today or week or month 배열에 삽입
        actions.payload.getList.forEach((item: noticeObject) => {
          const targetTime = Math.floor(+new Date(item.date) / 1000);
          const calcTime = Math.floor(+new Date() / 1000) - targetTime;

          if (calcTime < 60 * 60 * 24) {
            state.today = [...state.today, item]
          } else if (calcTime < 60 * 60 * 24 * 7) {
            state.week = [...state.week, item]
          } else {
            state.previous = [...state.previous, item]
          }
        })
      }
    }
  },
});


export const getNoticeAxiosThunk = (lastRef: number): AppThunk =>
  async (dispatch) => {
    dispatch(noticeActions.changeLoading(true));

    const sendRequest = async () => {
      const requestUrl = `${process.env.REACT_APP_HOST}/api/mpoffice/alarm/list/${JSON.parse(sessionStorage.user).userId}` +
      (lastRef !== -1 ? `?idx=${lastRef}` : "");

      console.log('여기로 보낼거임', requestUrl);
      const response = await axios.get(requestUrl, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
        },
        validateStatus: (status) => status === 200 || status === 401,
      })
      if (response.status === 401) {
        return false;
      } else {
        return response.data;
      }
    }
    try {
      const res = await sendRequest();
      console.log("notice get!", res);
      if (!res || res.empty) {
        dispatch(noticeActions.changeLoading(false));
        return;
      }
      dispatch(noticeActions.updateNoticeList({
        getList: res.content,
        lastNoticeId: lastRef,
        hasNext: !res.last,
      })
    );
    } catch (err) {
      console.log(err);
    }
    dispatch(noticeActions.changeLoading(false));
  }

export const noticeActions = noticeSlice.actions;
export default noticeSlice.reducer;
