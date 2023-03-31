import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { useParams } from "react-router-dom";
import { commentListActions } from "store/commentList";
import { Icon } from "@iconify/react";
import styles from "./NewComment.module.css";
import useAxios from "hooks/useAxios";


const NewComment:React.FC = () => {
    const dispatch = useDispatch();
    const commentInputRef = useRef<HTMLTextAreaElement>(null);
    const userId = JSON.parse(sessionStorage.user).userId;
    const parentId = useSelector<RootState, number|null>((state) => state.commentList.nowParentId);
    const parentName = useSelector<RootState, string|null>((state) => state.commentList.nowParentName);
    
    const params = useParams();
    const memeid = parseInt(params.meme_id!, 10);
    const {data, sendRequest} = useAxios();

    // 댓글 입력창 높이 늘어나게
    useEffect(() => {
        const textarea = document.querySelector("textarea")
        textarea?.addEventListener("keyup", e => {
            const target = e.target as HTMLTextAreaElement;
            target.classList.add(styles.expanded);
            target.style.height = "auto";
            target.style.height = `${target.scrollHeight}px`; 
          });
    }, [])

    const commentSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const enteredComment = commentInputRef.current!.value;

        // 댓글 post 보내고 작성한 댓글을 commentType 객체 하나로 response 받음
        sendRequest({
            url: "/api/mpoffice/meme/comment/create",
            method: "POST",
            data: {
                userId: userId,
                memeId: memeid,
                content: enteredComment,
                parentId: parentId,
            },
        });

        if("likes" in data) {
            dispatch(commentListActions.commentAddHandler(data));
        } else {
            dispatch(commentListActions.replyAddHandler(data));
        };
    };


    return (
        <form onSubmit={commentSubmitHandler}>
            <div className={styles.commentContainer}>
                <div className={styles.commentInputWrapper}>
                    <textarea className={styles.commentInput} ref={commentInputRef} required/>
                </div>
                <div className={styles.submitBtnWrapper}>
                    <Icon className={styles.submitBtn} icon="ph:arrow-circle-up-fill" onClick={() => commentSubmitHandler}/>
                </div>
            </div>
        </form>
    );
};

export default NewComment;