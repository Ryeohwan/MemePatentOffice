import { createSlice } from "@reduxjs/toolkit";

interface initialStateInterface {
  input: string;
  chatList: {
    id: string,
    message: string,
    time: string
  }[];
}
const initialState: initialStateInterface = {
  input: "",
  chatList: [
    { id: "3반 CA 김재준", message: "ㅋㅋㅋㅋ", time: "2023-03-21-10-29" },
    { id: "3반 CA 김재준", message: "밈 사고싶읍니다", time: "2023-03-21-10-29"},
    { id: "조명오", message: "개비싸네", time: "2023-03-21-10-31"},
    { id: "조명오", message: "내가 산다", time: "2023-03-21-10-31"},
    { id: "조명오", message: "나 조명오야", time: "2023-03-21-10-31"},
    { id: "3반 CA 김재준", message: "ㅋㅋㅋㅋ", time: "2023-03-21-10-31" },
  ],
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    inputText: (state, actions) => {
      state.input = actions.payload.input;
    },
    sendChat: (state, actions) => {
      state.chatList = [...state.chatList,actions.payload.chat];
      state.input = ''
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
