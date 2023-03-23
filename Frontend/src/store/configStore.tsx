import { configureStore } from '@reduxjs/toolkit'

import  testReducer from 'store/test'
import  chatReducer from 'store/chat'
import auctionReducer from 'store/auction'
import memeListReducer from 'store/memeList'

const store = configureStore({
  reducer: {
    test: testReducer,
    chat: chatReducer,
    auction: auctionReducer,
    memeList: memeListReducer
  },
})

export default store;
// useSelector 타입 지정
export type RootState = ReturnType<typeof store.getState>