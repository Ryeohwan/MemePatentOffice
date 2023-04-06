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
  nowParentId: null | number;
  nowParentName: null | string;
  replyComment: null | commentType

  replyLastCommentRef: number,
  nextCommentNewList: boolean;
  nextReplyNewList: boolean;
  loadingNewCommentList: boolean;
  loadingMoreNewCommentList: boolean;
  loadingBestCommentList: boolean;
}

const initialState: initialStateInterface = {
  commentNewList: [],
  commentBestList: [],
  nowParentId: null,
  nowParentName: null,
  replyComment: null,

  replyLastCommentRef: -1,
  nextCommentNewList: true,
  nextReplyNewList: true,
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

    // 댓글 입력 시
    commentAddHandler: (state, actions) => {
      state.commentNewList = [actions.payload, ...state.commentNewList];
    },
    // 대댓글 입력 시
    replyAddHandler: (state, actions) => {
      state.replyComment = actions.payload;
    },

    // 댓글 삭제
    commentDeleteHandler: (state, actions) => {
      state.commentNewList = state.commentNewList.filter(
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
      const requestUrl = `${process.env.REACT_APP_HOST}/api/mpoffice/meme/comment/list?memeId=${memeId}&userId=${userId}${lastPostRef !== -1 ?`&idx=${lastPostRef}` : `&idx=0`}`;


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
      if (!res || res.empty) {
        return;
      }

      dispatch(commentListActions.updateNewCommentList({
        getList: res.content,
        lastPostId : lastPostRef,
        hasNext: !res.last,
      }))
    } catch (err) {
    }
  };

export const getBestCommentListAxiosThunk =
  (memeId: number): AppThunk =>
  async (dispatch) => {
    const sendRequest = async () => {
      
      const userId = JSON.parse(sessionStorage.user).userId;
      const requestUrl = `${process.env.REACT_APP_HOST}/api/mpoffice/meme/comment/bestList?memeId=${memeId}&userId=${userId}`;


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
      if (!res || res.empty) {
        return;
      }
      dispatch(commentListActions.getBestCommentList(res.content));
    } catch (err) {
    }
  };

// export const getReplyListAxiosThunk =
//   (memeId: number, commentId: number, lastCommentRef:number): AppThunk =>
//   async (dispatch) => {
//     const sendRequest = async () => {

//       const userId = JSON.parse(sessionStorage.user).userId;
//       const requestUrl = `${process.env.REACT_APP_HOST}/api/mpoffice/meme/comment/reply?memeId=${memeId}&userId=${userId}&commentId=${commentId}${lastCommentRef !== -1 ?`&idx=${lastCommentRef}` : `&idx=0`}`;


//       const response = await axios.get(requestUrl, {
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
//           "Access-Control-Allow-Credentials": true,
//           "Content-Type": "application/json",
//         },
//         validateStatus: (status) => status === 200 || status === 401,
//       });

//       if (response.status === 401) {
//         // 로그아웃
//         return false;
//       } else {
//         return response.data;
//       }
//     };

//     try {
//       const res = await sendRequest();
//       if (!res || res.empty) {
//         return;
//       }
//       dispatch(commentListActions.updateReplyCommentList({
//         getList: res.content,
//         lastPostId : lastCommentRef,
//         hasNext: !res.last,
//       }))
//     } catch (err) {
//     }
//   };

export const commentListActions = commentListSlice.actions;
export default commentListSlice.reducer;
