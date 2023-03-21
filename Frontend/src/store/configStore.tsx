import { configureStore } from '@reduxjs/toolkit'

import  testReducer from 'store/test'
import  chatReducer from 'store/chat'

const store = configureStore({
  reducer: {
    test: testReducer,
    chat: chatReducer,
  },
})

export default store;
// useSelector 타입 지정
export type RootState = ReturnType<typeof store.getState>