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
}
const initialState: initialStateInterface = {
  input: "",
  chatList: [
  ],
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    closeAuction: (state) => {
      state.chatList = [];
    },
    inputText: (state, actions) => {
      state.input = actions.payload.input;
    },
    sendChat: (state, actions) => {
      state.chatList = [...state.chatList, actions.payload.chat];
      state.input = "";
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
