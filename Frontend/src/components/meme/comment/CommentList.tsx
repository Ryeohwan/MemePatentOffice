import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "store/configStore";
import { useAppDispatch } from "hooks/useAppDispatch";
import { commentType, getCommentListAxiosThunk, getBestCommentListAxiosThunk } from "store/commentList";
import CommentItem from "./CommentItem";
import styles from "./CommentList.module.css";


const CommentList: React.FC = () => {
  const appDispatch = useAppDispatch();
  const params = useParams();
  const memeid = parseInt(params.meme_id!, 10);

  useEffect(()=> {
    appDispatch(getCommentListAxiosThunk(memeid));
    appDispatch(getBestCommentListAxiosThunk(memeid));
  },[]);

  const recentCommentList = useSelector<RootState, commentType[]>(
    (state) => state.commentList.commentNewList
  );

  const bestCommentList = useSelector<RootState, commentType[]>(
    (state) => state.commentList.commentBestList
  );


  return (
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
    </>
  );
};

export default CommentList;
