import React, { useRef, useEffect } from "react";
import { commentType } from "store/commentList";
import { Icon } from "@iconify/react";
import styles from "./NewComment.module.css";

type NewCommentProps = {
    onAddComment: (comment: commentType) => void;
};

const NewComment:React.FC<NewCommentProps> = props => {
    const commentInputRef = useRef<HTMLTextAreaElement>(null);

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
        // post axios -> post axios 끝날 때 dispatch('getcomment')로 댓글 get -> 
        const enteredComment = commentInputRef.current!.value;
        // props.onAddComment({});
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