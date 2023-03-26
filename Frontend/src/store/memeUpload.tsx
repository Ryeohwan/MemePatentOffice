import { createSlice } from "@reduxjs/toolkit";


interface initialStateInterface {  
    // state: 유해성 검사
    
    title: string;
    titleChecked: boolean;  // 중복검사
    titleState: boolean;
    titleMsg: "";

    imgUrl: string;
    imgState: boolean;
    
    info: string;
    infoState: boolean;
    
    situation: string;
    situationState: boolean;

    checkbox: boolean;
}

const initialState: initialStateInterface = {
    title: "",
    titleChecked: false,
    titleState: true,
    titleMsg: "",
    imgUrl: "",
    imgState: true,
    info: "",
    infoState: true,
    situation: "",
    situationState: true,
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
    setTitleMsg: (state, actions) => {
        state.titleMsg = actions.payload;
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
        state.titleChecked = false;
        state.titleState = true;
        state.titleMsg = "";
        state.imgUrl = "";
        state.imgState = true;
        state.info = "";
        state.infoState = true;
        state.situation = "";
        state.situationState = true;
        state.checkbox = false;
    } 
  },
});

export const memeUploadActions = memeUploadSlice.actions;
export default memeUploadSlice.reducer;
