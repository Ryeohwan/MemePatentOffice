import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "./configStore";

export type commentType = {
  id: number;
  userId: number;
  userImgUrl: string;
  userName: string;
  comment: string;
  likes: number;
  date: string;
  liked: number;
  best: number;
  replyCommentCnt: number;
  parentId: null | number;
  parentName: null | string;
};

export type replyType = {
  writerNickname: string;
  writerImg: string;
  comment: string;
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
      userImgUrl: "theglory.jpeg",
      userName: "호롤롤로",
      comment: "경매 언제 열어주시나요 나 이거 증말 갖고싶어 죽겠어 ㅠ ㅠ",
      likes: 17,
      date: "1일 전",
      liked: 0,
      best: 0,
      replyCommentCnt: 0,
      parentId: null,
      parentName: null,
    },
    {
      id: 2,
      userId: 2,
      userImgUrl: "newjeans.jpg",
      userName: "5조의 햇살",
      comment:
        "아 이거 괜히 팔았다.. 다시 보니까 또 갖고 싶어.. 경매 다시 열어주시죠... 나 다시 가져올래..",
      likes: 25,
      date: "1주 전",
      liked: 0,
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
      userImgUrl: "totoro.jpg",
      userName: "단발머리 부엉이",
      comment:
        "나는 봄 타는 단발머리 부엉이 외로워서 점심마다 산책을 가즤요. 토토로 nft 만이 나의 낙이에요 고독사 직전의 부엉이",
      likes: 31,
      date: "3주 전",
      liked: 1,
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
      comment:
        "인정입니다 인정~~.. 토토로 졸귀입니다졸귀.. 저 이 nft 다시 가져오고 싶은데 경매 예정 없으십니까?",
      parentId: 1,
      parentName: "호롤롤로",
    },
    {
      writerImg: "totoro.jpg",
      writerNickname: "단발머리 부엉이",
      createdAt: "5일 전",
      comment: "알림 신청 해두시지요 .. 알림이 갈 겁니답쇼이옹",
      parentId: 1,
      parentName: "호롤롤로",
    },
    {
      writerImg: "newjeans.jpg",
      writerNickname: "5조의 햇살",
      createdAt: "3시간 전",
      comment:
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
      state.commentNewList = [...state.commentNewList, ...actions.payload];
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
            state.commentNewList[i].liked === 0 ? 1 : 0;
          state.commentNewList[i].likes +=
            state.commentNewList[i].liked === 0 ? -1 : 1;
          break;
        }
      }
      for (let i = 0; i < state.commentBestList.length; i++) {
        if (state.commentBestList[i].id === actions.payload.id) {
          state.commentBestList[i].liked =
            state.commentBestList[i].liked === 0 ? 1 : 0;
          state.commentBestList[i].likes +=
            state.commentBestList[i].liked === 0 ? -1 : 1;
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


// export const getCommentListAxiosThunk =
//   (input: string, lastPostRef: number): AppThunk =>
//   async (dispatch) => {
//     if (lastPostRef === -1) dispatch(commentListActions.changeNewCommentList(true));
//     else dispatch(commentListActions.changeNewCommentListMore(true));

//     const sendRequest = async () => {
//       const requestUrl =
//         `${process.env.REACT_APP_HOST}/api/mpoffice/meme/search?search=${input}` + ((lastPostRef !== -1) ? `&idx=${lastPostRef}` : '');

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
//         dispatch(commentListActions.changeResult(false));
//         return;
//       }
//       dispatch(commentListActions.changeResult(true));
//       dispatch(
//         commentListActions.updateMemeNewList({
//           getList: res.content,
//           lastPostId: lastPostRef,
//           hasNext: !res.last,
//         })
//       );
//     } catch (err) {
//       console.log(err);
//     }
//     if (lastPostRef === -1)
//       dispatch(commentListActions.changeNewCommentList(false));
//     else dispatch(commentListActions.changeNewCommentListMore(false));
//   };


export const commentListActions = commentListSlice.actions;
export default commentListSlice.reducer;
