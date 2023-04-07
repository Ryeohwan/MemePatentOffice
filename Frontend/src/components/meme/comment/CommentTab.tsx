import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { commentListActions } from "store/commentList";
import { RootState } from "store/configStore";
import { commentType } from "store/commentList";
import CommentList from "./CommentList";
import NewComment from "./NewComment";
import styles from "./CommentTab.module.css";

const CommentTab:React.FC = () => {
    const dispatch = useDispatch()

    return (
        <div className={styles.commentTabContainer}>
            <div className={styles.commentWrapper}>
                <CommentList/>
            </div>
            <NewComment/>
        </div>
    );
};

export default CommentTab;