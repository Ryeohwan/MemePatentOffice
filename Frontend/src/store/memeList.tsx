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
  period: string;
  loadingMemeList: boolean;
  result: boolean;
  
  nextMemeNewList: true;
  loadingMemeNewListMore: boolean;
  memeNewList: memeType[];
  
  nextMemePopularList: true;
  loadingMemePopularListMore: boolean;
  memePopularList: memeType[];
  
  memeRandomList: memeType[];
}

const initialState: initialStateInterface = {
  input: "",
  period: "",
  loadingMemeList: false,
  result: true,

  nextMemeNewList: true,
  loadingMemeNewListMore: false,
  memeNewList: [],

  nextMemePopularList: true,
  loadingMemePopularListMore: false,
  // memePopularList: [],
  // memeRandomList: [],

  // dummy data
  memePopularList: [
    {
      id: 1,
      nickname: "사나이",
      title:
        "귀여운 토토로 삼형제와 발랄한 자매 사츠키, 메이의 우당탕탕 가족사진입니다",
      imgUrl: "totoro.jpg",
      description: "오순도순 토토로 가족",
      example:
        "나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. ",
    },
    {
      id: 2,
      nickname: "사나이",
      title: "누가 이렇게 예쁘게 낳았어? 엄마엄마가~",
      imgUrl: "newjeans.jpg",
      description:
        "뉴진스의 곡 OMG 속 가사인 oh my oh my god 가 엄마엄마가~로 들린다고 해서 시작되었다.",
      example:
        "틱톡, 릴스 챌린지로 자리잡은 밈이다. 누가 이렇게 예쁘게 낳았어? 라고 질문하면 뉴진스의 OMG 노래를 부르며 엄마엄마가~ 라고 답한다.",
    },
    {
      id: 3,
      nickname: "사나이",
      title: "알아들었으면 끄덕여",
      imgUrl: "theglory.jpeg",
      description: "내 말 알아들었으면 끄덕여라",
      example:
        "인기 드라마 더 글로리 속 학교 폭력 가해자 박연진이 같은 무리의 친구(?) 최혜정에게 하는 대사이다. 최혜정이 박연진 남편의 친구 무리에게 박연진의 학창 시절에 대한 이야기를 해서 박연진이 화나서 하는 대사이다.",
    },
    {
      id: 4,
      nickname: "사나이",
      title:
        "귀여운 토토로 삼형제와 발랄한 자매 사츠키, 메이의 우당탕탕 가족사진입니다",
      imgUrl: "totoro.jpg",
      description: "오순도순 토토로 가족",
      example:
        "나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. ",
    },
    {
      id: 5,
      nickname: "사나이",
      title: "누가 이렇게 예쁘게 낳았어? 엄마엄마가~",
      imgUrl: "newjeans.jpg",
      description:
        "뉴진스의 곡 OMG 속 가사인 oh my oh my god 가 엄마엄마가~로 들린다고 해서 시작되었다.",
      example:
        "틱톡, 릴스 챌린지로 자리잡은 밈이다. 누가 이렇게 예쁘게 낳았어? 라고 질문하면 뉴진스의 OMG 노래를 부르며 엄마엄마가~ 라고 답한다.",
    },
    {
      id: 6,
      nickname: "사나이",
      title: "알아들었으면 끄덕여",
      imgUrl: "theglory.jpeg",
      description: "내 말 알아들었으면 끄덕여라",
      example:
        "인기 드라마 더 글로리 속 학교 폭력 가해자 박연진이 같은 무리의 친구(?) 최혜정에게 하는 대사이다. 최혜정이 박연진 남편의 친구 무리에게 박연진의 학창 시절에 대한 이야기를 해서 박연진이 화나서 하는 대사이다.",
    },
  ],
  memeRandomList: [
    {
      id: 1,
      nickname: "사나이",
      title:
        "귀여운 토토로 삼형제와 발랄한 자매 사츠키, 메이의 우당탕탕 가족사진입니다",
      imgUrl: "totoro.jpg",
      description: "오순도순 토토로 가족",
      example:
        "나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. ",
    },
    {
      id: 2,
      nickname: "사나이",
      title: "누가 이렇게 예쁘게 낳았어? 엄마엄마가~",
      imgUrl: "newjeans.jpg",
      description:
        "뉴진스의 곡 OMG 속 가사인 oh my oh my god 가 엄마엄마가~로 들린다고 해서 시작되었다.",
      example:
        "틱톡, 릴스 챌린지로 자리잡은 밈이다. 누가 이렇게 예쁘게 낳았어? 라고 질문하면 뉴진스의 OMG 노래를 부르며 엄마엄마가~ 라고 답한다.",
    },
    {
      id: 3,
      nickname: "사나이",
      title: "알아들었으면 끄덕여",
      imgUrl: "theglory.jpeg",
      description: "내 말 알아들었으면 끄덕여라",
      example:
        "인기 드라마 더 글로리 속 학교 폭력 가해자 박연진이 같은 무리의 친구(?) 최혜정에게 하는 대사이다. 최혜정이 박연진 남편의 친구 무리에게 박연진의 학창 시절에 대한 이야기를 해서 박연진이 화나서 하는 대사이다.",
    },
    {
      id: 4,
      nickname: "사나이",
      title:
        "귀여운 토토로 삼형제와 발랄한 자매 사츠키, 메이의 우당탕탕 가족사진입니다",
      imgUrl: "totoro.jpg",
      description: "오순도순 토토로 가족",
      example:
        "나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. ",
    },
    {
      id: 5,
      nickname: "사나이",
      title: "누가 이렇게 예쁘게 낳았어? 엄마엄마가~",
      imgUrl: "newjeans.jpg",
      description:
        "뉴진스의 곡 OMG 속 가사인 oh my oh my god 가 엄마엄마가~로 들린다고 해서 시작되었다.",
      example:
        "틱톡, 릴스 챌린지로 자리잡은 밈이다. 누가 이렇게 예쁘게 낳았어? 라고 질문하면 뉴진스의 OMG 노래를 부르며 엄마엄마가~ 라고 답한다.",
    },
    {
      id: 6,
      nickname: "사나이",
      title: "알아들었으면 끄덕여",
      imgUrl: "theglory.jpeg",
      description: "내 말 알아들었으면 끄덕여라",
      example:
        "인기 드라마 더 글로리 속 학교 폭력 가해자 박연진이 같은 무리의 친구(?) 최혜정에게 하는 대사이다. 최혜정이 박연진 남편의 친구 무리에게 박연진의 학창 시절에 대한 이야기를 해서 박연진이 화나서 하는 대사이다.",
    },
  ],
};

// 무한스크롤 하면서 수정해야할듯
const memeListSlice = createSlice({
  name: "memeList",
  initialState: initialState,
  reducers: {
    changeInputTxt: (state, actions) => {
      state.input = actions.payload;
    },
    changePeriod: (state, actions) => {
      state.period = actions.payload;
    },
    changeMemeListLoading(state, actions) {
      state.loadingMemeList = actions.payload;
    },
    changeResult: (state, actions) => {
      state.result = actions.payload;
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
    resetMemeNewList: (state) => {
      state.memeNewList = [];
    },
    
    changeMemePopularListLoadingMore(state, actions) {
      state.loadingMemePopularListMore = actions.payload;
    },
    getMemePopularList: (state, actions) => {
      state.memePopularList = actions.payload;
    },
    resetMemePopularList: (state) => {
      state.memePopularList = [];
    },
    
    getMemeRandomList: (state, actions) => {
      state.memeRandomList = actions.payload;
    },
  },
});

export const getMemeNewListAxiosThunk =
  (input: string, lastPostRef: number): AppThunk =>
  async (dispatch) => {
    // 처음 검색인 경우
    if (lastPostRef === -1) dispatch(memeListActions.changeMemeListLoading(true));
    else {
      dispatch(memeListActions.changeMemeNewListLoadingMore(true))
      // skeleton 띄우기 위해서 임의로 시간 term 부여
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    const sendRequest = async () => {
      const requestUrl =
        `${process.env.REACT_APP_HOST}/api/mpoffice/meme/search?search=${input}` + ((lastPostRef !== -1) ? `&idx=${lastPostRef}` : '');


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
      console.log("res", res);
      if (!res || res.empty) {
        dispatch(memeListActions.changeResult(false));
        dispatch(memeListActions.changeMemeListLoading(false));
        return;
      }
      dispatch(memeListActions.changeResult(true));
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
    if (lastPostRef === -1) dispatch(memeListActions.changeMemeListLoading(false));
    else dispatch(memeListActions.changeMemeNewListLoadingMore(false));
  };

export const memeListActions = memeListSlice.actions;
export default memeListSlice.reducer;
