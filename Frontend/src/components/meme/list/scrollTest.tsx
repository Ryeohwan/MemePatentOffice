// import { Fragment, useState, useRef, useEffect } from "react"
// import { Feed } from "semantic-ui-react"

// import PostItem from "./PostItem"
// import { useInView } from "react-intersection-observer"

// import { useDispatch, useSelector } from "react-redux"
// import CafeAuthFetch from "../certificate/cafeAuth/CafeAuthFetch"
// import { getPosts } from "../../store/posts.js"
// import LoadingPost from "./LoadingPost"

// const DEFAULT_REST_URL = process.env.REACT_APP_REST_DEFAULT_URL
// const DIST = 0.5

// const PostList = (props) => {
//   const dispatch = useDispatch()
//   const posts = useSelector((state) => state.posts.posts)
//   const filterState = useSelector((state) => state.posts.filterState)
//   const isLoading = useSelector((state) => state.posts.isLoading)
//   const isLoadingMore = useSelector((state)=> state.posts.isLoadingMore)
//   const hasNext = useSelector((state) => state.posts.hasNext)
//   const [lastPostRef, setLastPostRef] = useState(-1)

//   const isMounted = useRef(false)
//   const [ref, inView] = useInView({
//     threshold: 0.5,
//     delay: 500,
//   })

//   const filters = Object.entries(filterState)
//     .filter(([key, value]) => value === true)
//     .map(([key, value]) => key)

//   const refreshPosts = (postId = -1) => {
//     if (JSON.parse(sessionStorage.getItem("location"))) {
//       dispatch(
//         getPosts({
//           location: {
//             lat: JSON.parse(sessionStorage.getItem("location")).lat,
//             lng: JSON.parse(sessionStorage.getItem("location")).lng,
//           },
//           postId: postId,
//           filters: filters,
//         })
//       )
//     }
//   }

//   useEffect(() => {
//     CafeAuthFetch()
//     refreshPosts()
//   }, [filterState])

//   useEffect(() => {
//     if (isMounted.current && inView && lastPostRef !== -1) {
//       refreshPosts(lastPostRef)
//     }
//   }, [inView])

//   useEffect(() => {
//     if (isMounted.current) {
//       if (posts.length) {
//         setLastPostRef(posts[posts.length - 1].postId)
//       }
//     } else {
//       isMounted.current = true
//     }
//   }, [posts])

//   return (
//     <Fragment>
//       <Feed>
//         {isLoading && <LoadingPost/>}
//         {posts.map((post, index) => (
//           <PostItem
//           key={post.postId}
//           id={post.postId}
//           createdAt={post.createdAt}
//           type={post.postType}
//           writer={post.writerNickname}
//           userType={post.userType}
//           tier={post.exp}
//           cafeName={post.cafeName}
//           cafeBrand={post.brandType}
//           content={post.content}
//           images={post.imgUrlPath}
//           likeCnt={post.postLikeCount}
//           commentCnt={post.commentCount}
//           isLoading={isLoading}
//           isLiked={post.likeChecked}
//           />
//           ))}
//         {!isLoading && posts.length === 0 && <p>게시글이 없습니다.</p>}
//         {isLoadingMore && <LoadingPost/>}

//         <div ref={hasNext ? ref : null} />
//       </Feed>
//     </Fragment>
//   )
// }
// export default PostList

export{}