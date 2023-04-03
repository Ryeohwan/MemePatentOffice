import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "store/configStore";
import { useAppDispatch } from "hooks/useAppDispatch";
import {commentType,getCommentListAxiosThunk,getBestCommentListAxiosThunk, commentListActions} from "store/commentList";
import CommentItem from "./CommentItem";
import styles from "./CommentList.module.css";
import NoComment from "./NoComment";
import { useInView } from "react-intersection-observer";

const CommentList: React.FC = () => {
  const appDispatch = useAppDispatch();
  const dispatch = useDispatch();
  const [lastCommentRef, setLastCommentRef] = useState(-1);
  const params = useParams();
  const memeid = parseInt(params.meme_id!, 10);
  // 무한 스크롤
  const [ref, inView] = useInView({
    threshold: 1,
    delay: 300,
  })

  const recentCommentList = useSelector<RootState, commentType[]>(
    (state) => state.commentList.commentNewList
  );
  const bestCommentList = useSelector<RootState, commentType[]>(
    (state) => state.commentList.commentBestList
  );

  const hasNext = useSelector<RootState, boolean>(
    (state) => state.commentList.nextCommentNewList
  );

  useEffect(() => {
    appDispatch(getBestCommentListAxiosThunk(memeid));
    appDispatch(getCommentListAxiosThunk(memeid, -1));
    return (
      // unmount 시 배열 초기화
      () => {dispatch(commentListActions.resetCommentList())}
    );
  }, []);


  useEffect(() => {
    if (inView && lastCommentRef !== -1) {
      appDispatch(getCommentListAxiosThunk(memeid, lastCommentRef));
    }
  }, [inView]);

  useEffect(() => {
    if (recentCommentList.length > 0 ) {
      setLastCommentRef(recentCommentList[recentCommentList.length - 1].id -1)
    }
  }, [recentCommentList]);


  return (
    <>
      {recentCommentList.length === 0 && bestCommentList.length === 0 ? (
        <div className={styles.noCommentContainer}>
          <NoComment />
        </div>
      ) : (
        <>
          {bestCommentList.map((comment: commentType) => {
            return (
              <div className={styles.commentItemWrapper}>
                <CommentItem key={comment.id} items={comment} />
              </div>
            );
          })}

          {recentCommentList.map((comment: commentType) => {
            return (
              <div className={styles.commentItemWrapper}>
                <CommentItem key={comment.id} items={comment} />
              </div>
            );
          })}
          <div ref={hasNext ? ref : null} />
        </>
      )}
    </>
  );
};

export default CommentList;
