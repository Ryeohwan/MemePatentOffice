import React from "react";
import { commentType } from "store/commentList";
import CommentItem from "./CommentItem";
import styles from "./CommentList.module.css";

interface CommentProps {
  recentComments: commentType[],
  bestComments: commentType[]
};

const CommentList: React.FC<CommentProps> = ({recentComments, bestComments}) => {
  const bestCommentList = bestComments;
  const recentCommentList = recentComments;
  

  return (
    <>
      {bestCommentList.map((comment:commentType) => {
        return (
          <div className={styles.commentItemWrapper}>
            <CommentItem key={comment.id} items={comment} />
          </div>
        );
      })}

      {recentCommentList.map((comment:commentType) => {
        return (
          <div className={styles.commentItemWrapper}>
            <CommentItem key={comment.id} items={comment} />
          </div>
        )
      })}

    </>
  );
};

export default CommentList;
