import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "./configStore";

export type commentType = {
  id: number;
  userId: number;
  profileImage: string;
  nickname: string;
  content: string;
  heartCnt: number;
  date: string;
  liked: boolean;
  best: number;
  replyCommentCnt: number;
  parentId: null | number;
  parentName: null | string;
};

interface initialStateInterface {
  commentNewList: commentType[];
  commentBestList: commentType[];
  replyCommentList: commentType[];
  nowParentId: null | number;
  nowParentName: null | string;

  nextCommentNewList: boolean;
  loadingNewCommentList: boolean;
  loadingMoreNewCommentList: boolean;
  loadingBestCommentList: boolean;
}

const initialState: initialStateInterface = {
  commentNewList: [],
  commentBestList: [],
  replyCommentList: [],
  nowParentId: null,
  nowParentName: null,

  nextCommentNewList: true,
  loadingNewCommentList: false,
  loadingMoreNewCommentList: false,
  loadingBestCommentList: false,
};

const commentListSlice = createSlice({
  name: "commentList",
  initialState: initialState,
  reducers: {
    updateNewCommentList: (state, actions) => {
      state.nextCommentNewList = actions.payload.hasNext;
      if (actions.payload.lastPostRef === -1) {
        state.commentNewList = []
      }
      if (actions.payload.getList) {
        state.commentNewList = [...state.commentNewList, ...actions.payload.getList]
      }
    },
    getBestCommentList: (state, actions) => {
      state.commentBestList = actions.payload;
    },
    getReplyCommentList: (state, actions) => {
      state.replyCommentList = actions.payload;
    },

    // 댓글 입력 시
    commentAddHandler: (state, actions) => {
      state.commentNewList = [actions.payload, ...state.commentNewList];
    },
    // 대댓글 입력 시
    replyAddHandler: (state, actions) => {
      state.replyCommentList = [...state.replyCommentList, actions.payload];
    },

    // 댓글 삭제
    commentDeleteHandler: (state, actions) => {
      state.commentNewList = state.commentNewList.filter(
        (item) => item.id !== actions.payload
      );
    },

    // 대댓글 삭제
    replyDeleteHandler: (state, actions) => {
      state.replyCommentList = state.replyCommentList.filter(
        (item) => item.id !== actions.payload
      );
    },

    // 대댓글 달 때 원댓 id 같이 post하기 위해
    changeNowParentId: (state, actions) => {
      state.nowParentId = actions.payload;
    },
    // 대댓글 달 때 보여줄 원댓 작성자 닉네임
    changeNowParentName: (state, actions) => {
      state.nowParentName = actions.payload;
    },

    // 댓글 좋아요, 좋아요 취소
    toggleLike: (state, actions) => {
      for (let i = 0; i < state.commentNewList.length; i++) {
        if (state.commentNewList[i].id === actions.payload) {
          state.commentNewList[i].heartCnt +=
            state.commentNewList[i].liked === false ? 1 : -1;
          state.commentNewList[i].liked =
            state.commentNewList[i].liked === false ? true : false;
          break;
        }
      }
      for (let i = 0; i < state.commentBestList.length; i++) {
        if (state.commentBestList[i].id === actions.payload) {
          state.commentBestList[i].heartCnt +=
            state.commentBestList[i].liked === false ? 1 : -1;
          state.commentBestList[i].liked =
            state.commentBestList[i].liked === false ? true : false;
          break;
        }
      }
    },
    resetCommentList: (state) => {
      state.commentNewList = [];
      state.commentBestList = [];
      state.replyCommentList = [];
      state.nowParentId = null;
      state.nowParentName = null;
      
      state.nextCommentNewList = true;
      state.loadingNewCommentList = false;
      state.loadingMoreNewCommentList = false;
      state.loadingBestCommentList = false;
    },
  },
});

export const getCommentListAxiosThunk =
  (memeId: number, lastPostRef: number): AppThunk =>
  async (dispatch) => { 

    const sendRequest = async () => {
      const userId = JSON.parse(sessionStorage.user).userId;
      const requestUrl = `${process.env.REACT_APP_HOST}/api/mpoffice/meme/comment/list?memeId=${memeId}&userId=${userId}${lastPostRef !== -1 ?`&idx=${lastPostRef}` : ""}`;

      console.log("여기 보낼거임!", requestUrl);

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
      console.log("최신순 댓글", res);
      if (!res || res.empty) {
        return;
      }
      // dispatch(commentListActions.getCommentList(res.content));
      dispatch(commentListActions.updateNewCommentList({
        getList: res.content,
        lastPostId : lastPostRef,
        hasNext: !res.last,
      }))
    } catch (err) {
      console.log(err);
    }
  };

export const getBestCommentListAxiosThunk =
  (memeId: number): AppThunk =>
  async (dispatch) => {
    const sendRequest = async () => {
      
      const userId = JSON.parse(sessionStorage.user).userId;
      const requestUrl = `${process.env.REACT_APP_HOST}/api/mpoffice/meme/comment/bestList?memeId=${memeId}&userId=${userId}`;

      console.log("여기 보낼거임!", requestUrl);

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
      console.log("베스트 댓글", res);
      if (!res || res.empty) {
        return;
      }
      dispatch(commentListActions.getBestCommentList(res.content));
    } catch (err) {
      console.log(err);
    }
  };

export const getReplyListAxiosThunk =
  (memeId: number, commentId: number): AppThunk =>
  async (dispatch) => {
    const sendRequest = async () => {
      const requestUrl = `${process.env.REACT_APP_HOST}/api/mpoffice/meme/comment/reply?memeId=${memeId}&commentId=${commentId}`;

      console.log("대댓글리스트 조회!", requestUrl);

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
      console.log("대댓글", res);
      if (!res || res.empty) {
        return;
      }
      dispatch(commentListActions.getReplyCommentList(res.content));
    } catch (err) {
      console.log(err);
    }
  };

export const commentListActions = commentListSlice.actions;
export default commentListSlice.reducer;
