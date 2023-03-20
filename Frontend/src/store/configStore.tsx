import { configureStore } from '@reduxjs/toolkit'

import  testReducer from 'store/test'

const store = configureStore({
  reducer: {
    test: testReducer, 
  },
})

export default store;
// useSelector 타입 지정
export type RootState = ReturnType<typeof store.getState>