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
}

interface initialStateInterface {
    input: string;
    date: string;
    commentNewList: commentType[];
}

const initialState: initialStateInterface = {
    input: "",
    date: "",
    commentNewList: [
        {
            id: 1,
            userId: 1,
            userImgUrl: "totoro.jpg",
            userName: "단발머리 부엉이",
            comment: "나는 봄 타는 단발머리 부엉이 외로워서 점심마다 산책을 가즤요. 걷기라도 잘 걸어보자 음화화화",
            likes: 31,
            date: "3주 전",
            liked: 1,
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
        },
        {
            id: 3,
            userId: 3,
            userImgUrl: "theglory.jpeg",
            userName: "호롤롤로",
            comment: "경매 언제 열어주시나요 나 이거 증말 갖고싶어 죽겠어 ㅠ ㅠ",
            likes: 17,
            date: "1일 전",
            liked: 0,
        }
    ]
};

const commentListSlice = createSlice({
    name: "commentList",
    initialState: initialState,
    reducers: {
        getCommentList: (state, actions) => {
            state.commentNewList = actions.payload;
        },
        toggleLike : (state, actions) => {
            for(let i=0; i<state.commentNewList.length; i++){
                if (state.commentNewList[i].id === actions.payload.id){
                    state.commentNewList[i].liked = state.commentNewList[i].liked === 0 ? 1 : 0
                    state.commentNewList[i].likes += state.commentNewList[i].liked === 0 ? -1 : 1
                    break
                }
            }            
        }
        
    }
});

export const commentListActions = commentListSlice.actions;
export default commentListSlice.reducer;