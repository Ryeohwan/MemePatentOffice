// / post 관련 상태관리

// import { createSlice } from "@reduxjs/toolkit"
// import getAccessToken from "../hooks/getAccessToken"
// const initialPostsState = {
//   hasNext: true,
//   posts: [],
//   filterState: {
//     hot: false,
//     free: false,
//     qna: false,
//     together: false,
//     tip: false,
//     recommend: false,
//     help: false,
//     lost: false,
//   },
//   isLoading: false,
//   isLoadingMore: false,
// }

// const postsSlice = createSlice({
//   name: "posts",
//   initialState: initialPostsState,
//   reducers: {
//     // posts 업데이트
//     updatePosts(state, actions) {
//       state.hasNext = actions.payload.hasNext
//       if (actions.payload.lastPostId === -1) {
//         state.posts = []
//       }
//       if (actions.payload.fetchedPosts) {
//         state.posts = [...state.posts, ...actions.payload.fetchedPosts]
//       }
//     },

//     isLoading(state) {
//       state.isLoading = !state.isLoading
//     },
//     isLoadingMore(state) {
//       state.isLoadingMore = !state.isLoadingMore
//     },
//   },
// })
// const DEFAULT_REST_URL = process.env.REACT_APP_REST_DEFAULT_URL

// export const getPosts = (dataSet) => {
//   return async (dispatch) => {
//     if (dataSet.postId === -1) {
//       dispatch(postsActions.isLoading())
//     } else {
//       dispatch(postsActions.isLoadingMore())
//     }

//     const sendRequest = async () => {
//       const response = await fetch(`${DEFAULT_REST_URL}/main/post/feed`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
//         },
//         body: JSON.stringify({
//           postId: dataSet.postId,
//           types: dataSet.filters.length
//             ? dataSet.filters
//             : ["free", "qna", "together", "tip", "recommend", "help", "lost"],
//           latitude: dataSet.location.lat,
//           longitude: dataSet.location.lng,
//           dist: 0.5,
//         }),
//       })
//       const responseData = await response.json()
//       if (
//         responseData.httpStatus === "UNAUTHORIZED" &&
//         responseData.data.sign === "JWT"
//       ) {
//         getAccessToken({ func: sendRequest, dataSet: dataSet })
//       }
//       if (
//         responseData.httpStatus === "OK" ||
//         responseData.httpStatus === "NO_CONTENT"
//       ) {
//         return responseData.data
//       }
//     }
//     try {
//       const { hasNext, post } = await sendRequest()

//       // response로 fetchedpost / lastpostid / hasnext 변경
//       dispatch(
//         postsActions.updatePosts({
//           fetchedPosts: post,
//           lastPostId: dataSet.postId,
//           hasNext: hasNext,
//         })
//       )
//     } catch (error) {
//       console.error("에러")
//     }
//     if (dataSet.postId === -1) {
//       // 첫 요청이면
//       dispatch(postsActions.isLoading())
//     } else {
//       // 이후 요청이면
//       dispatch(postsActions.isLoadingMore())
//     }
//   }
// }
// export const postsActions = postsSlice.actions

// export default postsSlice.reducer

export {}