import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { commentType } from "store/commentList";
import CommentItem from "./CommentItem";
import styles from "./CommentListComp.module.css";

const CommentListComp: React.FC = () => {
  const dispatch = useDispatch();

  const commentList = useSelector<RootState, commentType[]>(
    (state) => state.commentList.commentNewList
  );

  return (
    <>
      {commentList.map((comment, i) => {
        return (
          <div className={styles.commentItemWrapper}>
            <CommentItem key={i} items={comment} />
          </div>
        );
      })}
    </>
  );
};

export default CommentListComp;
