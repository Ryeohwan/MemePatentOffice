import { AnyAction, createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch, AppThunk } from "./configStore";

export type memeType = {
  id: number;
  nickname: string;
  title: string;
  imgUrl: string;
  description: string;
  example: string;
};

interface initialStateInterface {
  input: string;
  range: string;
  loadingMemeList: boolean;
  
  newListResult: true;
  nextMemeNewList: true;
  loadingMemeNewListMore: boolean;
  memeNewList: memeType[];

  popularListResult: true;
  nextMemePopularList: true;
  loadingMemePopularListMore: boolean;
  loadingMemePopularListRange: boolean;
  memePopularList: memeType[];
}

const initialState: initialStateInterface = {
  input: "",
  range: "all",
  loadingMemeList: false,
  
  newListResult: true,
  nextMemeNewList: true,
  loadingMemeNewListMore: false,
  memeNewList: [],

  popularListResult: true,
  nextMemePopularList: true,
  loadingMemePopularListMore: false,
  loadingMemePopularListRange: false,
  memePopularList: [],
};


const memeListSlice = createSlice({
  name: "memeList",
  initialState: initialState,
  reducers: {
    changeInputTxt: (state, actions) => {
      state.input = actions.payload;
    },
    changeRange: (state, actions) => {
      state.range = actions.payload;
    },
    changeMemeListLoading(state, actions) {
      state.loadingMemeList = actions.payload;
    },
    
    changeNewResult: (state, actions) => {
      state.newListResult = actions.payload;
    },
    changeMemeNewListLoadingMore(state, actions) {
      state.loadingMemeNewListMore = actions.payload;
    },
    updateMemeNewList: (state, actions) => {
      state.nextMemeNewList = actions.payload.hasNext;
      if (actions.payload.lastPostId === -1) {
        state.memeNewList = [];
      }
      if (actions.payload.getList) {
        state.memeNewList = [...state.memeNewList, ...actions.payload.getList];
      }
    },
    
    changePopularResult: (state, actions) => {
      state.popularListResult = actions.payload;
    },
    changeMemePopularListLoadingMore(state, actions) {
      state.loadingMemePopularListMore = actions.payload;
    },
    updateMemePopularList: (state, actions) => {
      state.nextMemePopularList = actions.payload.hasNext;
      if (actions.payload.lastPostId === -1) {
        state.memePopularList = [];
      }
      if (actions.payload.getList) {
        state.memePopularList = [
          ...state.memePopularList,
          ...actions.payload.getList,
        ];
      }
    },
    resetMemePopularList: (state) => {
      state.memePopularList = [];
    },
    changeMemePopularListLoadingRange(state, actions) {
      state.loadingMemePopularListRange = actions.payload;
    },

    resetAll: (state) => {
      state.input = "";
      state.range = "all";
      state.loadingMemeList = false;
      state.newListResult = true;
      state.nextMemeNewList = true;
      state.loadingMemeNewListMore = false;
      state.memeNewList = [];
      state.popularListResult = true;
      state.nextMemePopularList = true;
      state.loadingMemePopularListMore = false;
      state.loadingMemePopularListRange = false;
      state.memePopularList = [];
    },
  },
});

export const getMemeNewListAxiosThunk =
  (input: string, lastPostRef: number): AppThunk =>
  async (dispatch) => {
    // 처음 검색인 경우
    if (lastPostRef === -1)
      dispatch(memeListActions.changeMemeListLoading(true));
    else {
      dispatch(memeListActions.changeMemeNewListLoadingMore(true));
      // skeleton 띄우기 위해서 임의로 시간 term 부여
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    const sendRequest = async () => {
      const requestUrl =
        `${process.env.REACT_APP_HOST}/api/mpoffice/meme/search?search=${input}` +
        (lastPostRef !== -1 ? `&idx=${lastPostRef}` : "");

      const response = await axios.get(requestUrl, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
        },
        validateStatus: (status) => status === 200 || status === 401,
      });

      if (response.status === 401) {
        // 로그아웃
        return false;
      } else {
        return response.data;
      }
    };

    try {
      const res = await sendRequest();
      console.log("new res", res);
      if (!res || res.empty) {
        dispatch(memeListActions.changeNewResult(false));
        dispatch(memeListActions.changeMemeListLoading(false));
        return;
      }
      dispatch(memeListActions.changeNewResult(true));
      dispatch(
        memeListActions.updateMemeNewList({
          getList: res.content,
          lastPostId: lastPostRef,
          hasNext: !res.last,
        })
      );
    } catch (err) {
      console.log(err);
    }
    if (lastPostRef === -1)
      dispatch(memeListActions.changeMemeListLoading(false));
    else dispatch(memeListActions.changeMemeNewListLoadingMore(false));
  };



export const getMemePopularListAxiosThunk =
  (input: string, range: string, changeRange: boolean, lastPostRef: number): AppThunk =>
  async (dispatch) => {
    if (lastPostRef === -1 && !changeRange){
      // 첫 검색인데 range 안바뀐 경우
      dispatch(memeListActions.changeMemeListLoading(true));
    } else if (lastPostRef === -1 && changeRange) {
      // 첫 검색인데 range 바뀐 경우
      dispatch(memeListActions.changeMemePopularListLoadingRange(true));
    } else {
      // 첫 검색 아닌 경우 (무한스크롤)
      dispatch(memeListActions.changeMemePopularListLoadingMore(true));
      // skeleton 띄우기 위해서 임의로 시간 term 부여
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    const sendRequest = async () => {
      const requestUrl =
        `${process.env.REACT_APP_HOST}/api/mpoffice/meme/search/popular?search=${input}` +
        (range !== "all" ? `&days=${range}` : "") +
        (lastPostRef !== -1 ? `&idx=${lastPostRef}` : "");

      console.log(requestUrl);
      const response = await axios.get(requestUrl, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
        },
        validateStatus: (status) => status === 200 || status === 401,
      });

      if (response.status === 401) {
        // 로그아웃
        return false;
      } else {
        return response.data;
      }
    };

    try {
      const res = await sendRequest();
      console.log("popular res", res);
      if (!res || res.empty) {
        dispatch(memeListActions.changePopularResult(false));
        dispatch(memeListActions.changeMemeListLoading(false));
        return;
      }
      dispatch(memeListActions.changePopularResult(true));
      dispatch(
        memeListActions.updateMemePopularList({
          getList: res.content,
          lastPostId: lastPostRef,
          hasNext: !res.last,
        })
      );
    } catch (err) {
      console.log(err);
    }
    if (lastPostRef === -1 && !changeRange) {
      dispatch(memeListActions.changeMemeListLoading(false));
    } else if (lastPostRef === -1 && changeRange) {
      dispatch(memeListActions.changeMemePopularListLoadingRange(false));
    } else {
      dispatch(memeListActions.changeMemePopularListLoadingMore(false));
    }
  };

export const memeListActions = memeListSlice.actions;
export default memeListSlice.reducer;
