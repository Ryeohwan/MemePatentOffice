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

export type replyType = {
  writerNickname: string;
  writerImg: string;
  content: string;
  createdAt: string;
  parentId: null | number;
  parentName: null | string;
};

interface initialStateInterface {
  commentNewList: commentType[];
  commentBestList: commentType[];
  replyCommentList: replyType[];
  nowParentId: null | number;
  nowParentName: null | string;
  loadingNewCommentList: boolean;
  loadingMoreNewCommentList: boolean;
  loadingBestCommentList: boolean;
  result: boolean;
}

const initialState: initialStateInterface = {
  commentNewList: [
    {
      id: 1,
      userId: 3,
      profileImage: "theglory.jpeg",
      nickname: "호롤롤로",
      content: "경매 언제 열어주시나요 나 이거 증말 갖고싶어 죽겠어 ㅠ ㅠ",
      heartCnt: 17,
      date: "1일 전",
      liked: false,
      best: 0,
      replyCommentCnt: 0,
      parentId: null,
      parentName: null,
    },
    {
      id: 2,
      userId: 2,
      profileImage: "newjeans.jpg",
      nickname: "5조의 햇살",
      content:
        "아 이거 괜히 팔았다.. 다시 보니까 또 갖고 싶어.. 경매 다시 열어주시죠... 나 다시 가져올래..",
      heartCnt: 25,
      date: "1주 전",
      liked: false,
      best: 0,
      replyCommentCnt: 0,
      parentId: null,
      parentName: null,
    },
  ],
  commentBestList: [
    {
      id: 3,
      userId: 1,
      profileImage: "totoro.jpg",
      nickname: "단발머리 부엉이",
      content:
        "나는 봄 타는 단발머리 부엉이 외로워서 점심마다 산책을 가즤요. 토토로 nft 만이 나의 낙이에요 고독사 직전의 부엉이",
      heartCnt: 31,
      date: "3주 전",
      liked: true,
      best: 1,
      replyCommentCnt: 3,
      parentId: null,
      parentName: null,
    },
  ],
  replyCommentList: [
    {
      writerImg: "newjeans.jpg",
      writerNickname: "5조의 햇살",
      createdAt: "1주 전",
      content:
        "인정입니다 인정~~.. 토토로 졸귀입니다졸귀.. 저 이 nft 다시 가져오고 싶은데 경매 예정 없으십니까?",
      parentId: 1,
      parentName: "호롤롤로",
    },
    {
      writerImg: "totoro.jpg",
      writerNickname: "단발머리 부엉이",
      createdAt: "5일 전",
      content: "알림 신청 해두시지요 .. 알림이 갈 겁니답쇼이옹",
      parentId: 1,
      parentName: "호롤롤로",
    },
    {
      writerImg: "newjeans.jpg",
      writerNickname: "5조의 햇살",
      createdAt: "3시간 전",
      content:
        "예.... 아 12월 28일 경매 예정이시군요 당장 알림신청 했읍니다... 다시 가져오고 말겠읍니다.",
      parentId: 1,
      parentName: "호롤롤로",
    },
  ],
  nowParentId: null,
  nowParentName: null,
  loadingNewCommentList: false,
  loadingMoreNewCommentList: false,
  loadingBestCommentList: false,
  result: false
};

const commentListSlice = createSlice({
  name: "commentList",
  initialState: initialState,
  reducers: {
    getCommentList: (state, actions) => {
      // 무한 스크롤 용
      state.commentNewList = actions.payload;
    },
    getBestCommentList: (state, actions) => {
      state.commentBestList = actions.payload;
    },
    getReplyCommentList: (state, actions) => {
      state.replyCommentList = actions.payload;
    },

    // 댓글 좋아요, 좋아요 취소
    toggleLike: (state, actions) => {
      for (let i = 0; i < state.commentNewList.length; i++) {
        if (state.commentNewList[i].id === actions.payload.id) {
          state.commentNewList[i].liked =
            state.commentNewList[i].liked === false ? true : false;
          state.commentNewList[i].heartCnt +=
            state.commentNewList[i].liked === false ? 1 : -1;
          break;
        }
      }
      for (let i = 0; i < state.commentBestList.length; i++) {
        if (state.commentBestList[i].id === actions.payload.id) {
          state.commentBestList[i].liked =
            state.commentBestList[i].liked === false ? true : false;
          state.commentBestList[i].heartCnt +=
            state.commentBestList[i].liked === false ? 1 : -1;
          break;
        }
      }
    },

    changeResult(state, actions) {
      state.result = actions.payload;
    },

    // 무한스크롤 로딩
    changeNewCommentList(state, actions) {
      state.loadingNewCommentList = actions.payload;
    },
    changeNewCommentListMore(state, actions) {
      state.loadingMoreNewCommentList = actions.payload;
    },
    changeBestCommentList(state, actions) {
      state.loadingBestCommentList = actions.payload;
    },

    // 댓글 입력 시
    commentAddHandler: (state, actions) => {
      state.commentNewList = [...actions.payload, ...state.commentNewList];
    },
    // 대댓글 입력 시
    replyAddHandler: (state, actions) => {
        state.replyCommentList = [ ...state.replyCommentList, ...actions.payload];
    },

    // 댓글 삭제
    commentDeleteHandler: (state, actions) => {
      state.commentNewList.filter((item) => item.id !== actions.payload.id);
    },
    // 대댓글 삭제

    // 대댓글 달 때 원댓 id 같이 post하기 위해
    changeNowParentId: (state, actions) => {
      state.nowParentId = actions.payload;
    },
    // 대댓글 달 때 보여줄 원댓 작성자 닉네임
    changeNowParentName: (state, actions) => {
        state.nowParentName = actions.payload;
    },

  },
});


export const getCommentListAxiosThunk =
  ( memeId: number): AppThunk =>
  async (dispatch) => {

    const sendRequest = async () => {
      const requestUrl = `${process.env.REACT_APP_HOST}/api/mpoffice/meme/comment/list?memeId=${memeId}`;

      console.log('여기 보낼거임!', requestUrl);

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
      dispatch(commentListActions.getCommentList(res.content));
    } catch (err) {
      console.log(err);
    }
  };

export const getBestCommentListAxiosThunk =
  ( memeId: number): AppThunk =>
  async (dispatch) => {

    const sendRequest = async () => {
      const requestUrl = `${process.env.REACT_APP_HOST}/api/mpoffice/meme/comment/bestList?memeId=${memeId}`;

      console.log('여기 보낼거임!', requestUrl);

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

// export const getReplyListAxiosThunk =
//   ( commentId: number): AppThunk =>
//   async (dispatch) => {

//     const sendRequest = async () => {
//       const requestUrl = `${process.env.REACT_APP_HOST}/api/mpoffice/meme/comment/list?memeId=${commentId}`;

//       console.log('여기 보낼거임!', requestUrl);

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
//       console.log("res", res);
//       if (!res || res.empty) {
//         return;
//       }
//       dispatch(commentListActions.getCommentList(res.content));
//     } catch (err) {
//       console.log(err);
//     }
//   };


export const commentListActions = commentListSlice.actions;
export default commentListSlice.reducer;
