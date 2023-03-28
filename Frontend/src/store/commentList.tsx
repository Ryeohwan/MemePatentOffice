import { createSlice } from "@reduxjs/toolkit";

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
}

interface initialStateInterface {
    commentNewList: commentType[];
    commentBestList: commentType[];
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
        },
        {
            id: 2,
            userId: 2,
            userImgUrl: "newjeans.jpg",
            userName: "5조의 햇살",
            comment: "이거 갖고싶은 탐나는 nft인데요....",
            likes: 25,
            date: "1주 전",
            liked: 0,
            best: 0,
        },
    ],
    commentBestList: [
        {
            id: 3,
            userId: 1,
            userImgUrl: "totoro.jpg",
            userName: "단발머리 부엉이",
            comment: "나는 봄 타는 단발머리 부엉이 외로워서 점심마다 산책을 가즤요. 토토로 nft 만이 나의 낙이에요 고독사 직전의 부엉이",
            likes: 31,
            date: "3주 전",
            liked: 1,
            best: 1,
        },
    ]
};





const commentListSlice = createSlice({
    name: "commentList",
    initialState: initialState,
    reducers: {
        getCommentList: (state, actions) => { // 무한 스크롤 용
            state.commentNewList = [...state.commentNewList,...actions.payload]
        },
        getBestCommentList: (state, actions) => {
            state.commentBestList = actions.payload;
        },
        toggleLike : (state, actions) => {
            for(let i=0; i<state.commentNewList.length; i++){
                if (state.commentNewList[i].id === actions.payload.id){
                    state.commentNewList[i].liked = state.commentNewList[i].liked === 0 ? 1 : 0
                    state.commentNewList[i].likes += state.commentNewList[i].liked === 0 ? -1 : 1
                    break
                }
            };
            for (let i=0; i<state.commentBestList.length; i++){
                if (state.commentBestList[i].id === actions.payload.id){
                    state.commentBestList[i].liked = state.commentBestList[i].liked === 0 ? 1 : 0
                    state.commentBestList[i].likes += state.commentBestList[i].liked === 0 ? -1 : 1
                    break
                }
            };           
        },
        commentAddHander : (state, actions) => { // 댓글 입력 시
            state.commentNewList = [...actions.payload ,...state.commentNewList]
        }

    }
});

export const commentListActions = commentListSlice.actions;
export default commentListSlice.reducer;