import { createSlice } from "@reduxjs/toolkit";


interface initialStateInterface {  
    // state: 유해성 검사
    // -2 : 여러번 요청해서 에러남
    // -1 : 유해성검사 안함
    // 0  : 유해성검사 통과 못함
    // 1  : 유해성검사 통과
    
    title: string;
    titleChecked: null | boolean;  // 중복검사
    titleState: number;

    imgUrl: string;
    imgState: number;
    
    info: string;
    infoState: number;
    
    situation: string;
    situationState: number;

    checkbox: boolean;
}

const initialState: initialStateInterface = {
    title: "",
    titleChecked: null,
    titleState: -1,
    imgUrl: "",
    imgState: -1,
    info: "",
    infoState: -1,
    situation: "",
    situationState: -1,
    checkbox: false
};

const memeUploadSlice = createSlice({
  name: "memeUpload",
  initialState: initialState,
  reducers: {
    putTitle: (state, actions) => {
        state.title = actions.payload;
    },
    setTitleChecked: (state, actions) => {
        state.titleChecked = actions.payload;
    },
    setTitleState: (state, actions) => {
        state.titleState = actions.payload;
    },
    putImgUrl: (state, actions) => {
        state.imgUrl = actions.payload;
    },
    setImgState: (state, actions) => {
        state.imgState = actions.payload;
    },
    putInfo: (state, actions) => {
        state.info = actions.payload;
    },
    setInfoState: (state, actions) => {
        state.infoState = actions.payload;
    },
    putSituation: (state, actions) => {
        state.situation = actions.payload;
    },
    setSituationState: (state, actions) => {
        state.situationState = actions.payload;
    },
    toggleCheckBox: (state, actions) => {
        state.checkbox = actions.payload;
    },
    resetData: (state) => {
        state.title = "";
        state.titleChecked = null;
        state.titleState = -1;
        state.imgUrl = "";
        state.imgState = -1;
        state.info = "";
        state.infoState = -1;
        state.situation = "";
        state.situationState = -1;
        state.checkbox = false;
    } 
  },
});

export const memeUploadActions = memeUploadSlice.actions;
export default memeUploadSlice.reducer;
