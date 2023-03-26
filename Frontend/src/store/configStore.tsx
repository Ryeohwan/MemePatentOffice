import { configureStore } from '@reduxjs/toolkit'

import  testReducer from 'store/test'
import  chatReducer from 'store/chat'
import auctionReducer from 'store/auction'
import memeListReducer from 'store/memeList'
import auctionListReducer from 'store/auctionList'
import noticeReducer from 'store/notice'
import auctionUploadReducer from 'store/auctionUpload'
import nftHistoryReducer from 'store/nftHistory'
import historyReducer from 'store/history'
import memeUploadReducer from 'store/memeUpload'

const store = configureStore({
  reducer: {
    test: testReducer,
    chat: chatReducer,
    auction: auctionReducer,
    auctionList: auctionListReducer,
    auctionUpload: auctionUploadReducer,
    memeList: memeListReducer,
    memeUpload: memeUploadReducer,
    notice: noticeReducer,
    nftHistory: nftHistoryReducer,
    history: historyReducer,
  },
})

export default store;
// useSelector 타입 지정
export type RootState = ReturnType<typeof store.getState>