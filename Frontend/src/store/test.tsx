import { createSlice } from "@reduxjs/toolkit";

interface initialStateInterface{
    title: string,
    contents:string
}
const initialState: initialStateInterface = { title:'', contents:''}

const testSlice = createSlice({
    name: "test",
    initialState: initialState,
    reducers: {
        test: (state, action) => {
            state.title = action.payload.title;
            state.contents = action.payload.contents
        }
    },
});

export const testActions = testSlice.actions
export default testSlice.reducer;