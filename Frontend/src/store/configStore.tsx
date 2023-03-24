import { configureStore } from '@reduxjs/toolkit'

import  testReducer from 'store/test'
import  chatReducer from 'store/chat'
import auctionReducer from 'store/auction'
import memeListReducer from 'store/memeList'
import auctionListReducer from 'store/auctionList'

const store = configureStore({
  reducer: {
    test: testReducer,
    chat: chatReducer,
    auction: auctionReducer,
    memeList: memeListReducer,
    auctionList: auctionListReducer
  },
})

export default store;
// useSelector 타입 지정
export type RootState = ReturnType<typeof store.getState>