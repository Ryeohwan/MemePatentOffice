import { createSlice } from "@reduxjs/toolkit";

export type chatList= {
  id: string;
  message: string;
  time: string;
  profileImgUrl: string|null;
}

interface initialStateInterface {
  input: string;
  chatList: chatList[];
  chatcnt: number;
  isLooking: boolean
}
const initialState: initialStateInterface = {
  input: "",
  chatList: [
  ],
  chatcnt: 0,
  isLooking: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    closeAuction: (state) => {
      state.chatList = [];
      state.chatcnt = 0;
      state.isLooking = false
    },
    inputText: (state, actions) => {
      state.input = actions.payload.input;
    },
    sendChat: (state, actions) => {
      state.chatList = [...state.chatList, actions.payload.chat];
      state.input = "";
    },
    getChat: ( state) => {
      state.chatcnt += 1
    },
    resetChatcnt: (state) => {
      state.chatcnt = 0
      state.isLooking = true
    },
    isNotLooking: (state) => {
      state.isLooking = false
    }
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
