import { configureStore } from '@reduxjs/toolkit';
import {Action} from 'redux';
import { ThunkAction } from 'redux-thunk';

import  testReducer from 'store/test';
import  chatReducer from 'store/chat';
import auctionReducer from 'store/auction';
import memeListReducer from 'store/memeList';
import noticeReducer from 'store/notice';
import auctionUploadReducer from 'store/auctionUpload';
import nftHistoryReducer from 'store/nftHistory';
import historyReducer from 'store/history';
import memeUploadReducer from 'store/memeUpload';
import commentListReducer from 'store/commentList';

const store = configureStore({
  reducer: {
    test: testReducer,
    chat: chatReducer,
    auction: auctionReducer,
    auctionUpload: auctionUploadReducer,
    memeList: memeListReducer,
    memeUpload: memeUploadReducer,
    notice: noticeReducer,
    nftHistory: nftHistoryReducer,
    history: historyReducer,
    commentList: commentListReducer,
  },
})

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
// useSelector 타입 지정
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch