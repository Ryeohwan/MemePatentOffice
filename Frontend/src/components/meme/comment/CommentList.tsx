import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { commentType } from "store/commentList";
import CommentItem from "./CommentItem";
import styles from "./CommentList.module.css";


const CommentList: React.FC = () => {
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
