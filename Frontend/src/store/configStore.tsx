import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {

  },
})

export default store;

// useSelector 타입 지정
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch