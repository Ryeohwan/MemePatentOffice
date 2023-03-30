import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { commentListActions } from "store/commentList";
import { RootState } from "store/configStore";
import { commentType } from "store/commentList";
import CommentList from "./CommentList";
import NewComment from "../detail/NewComment";
import styles from "./CommentTab.module.css";

const CommentTab:React.FC = () => {
    const dispatch = useDispatch()
    
    const recentCommentList = useSelector<RootState, commentType[]>(
        (state) => state.commentList.commentNewList
    );

    const bestCommentList = useSelector<RootState, commentType[]>(
        (state) => state.commentList.commentBestList
    );

    const commentAddHandler = (comment:commentType) => {
        dispatch(commentListActions.commentAddHander(comment))
    };

    return (
        <div className={styles.commentTabContainer}>
            <CommentList recentComments={recentCommentList} bestComments={bestCommentList} />
            <NewComment onAddComment={commentAddHandler}/>
        </div>
    );
};

export default CommentTab;