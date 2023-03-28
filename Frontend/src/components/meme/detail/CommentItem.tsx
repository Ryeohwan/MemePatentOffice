import React, {useState, useEffect} from "react";
import { Icon } from "@iconify/react";
import styles from "./CommentItem.module.css";
import commentList, { commentType } from "store/commentList";
import { useDispatch } from "react-redux";
import { commentListActions } from "store/commentList";

interface CommentType {
    items: commentType,
};

const CommentItem:React.FC<CommentType> = comment => {
    const dispatch = useDispatch();

    const deleteCommentHandler = () => {
        dispatch(commentListActions.commentDeleteHandler({id:comment.items.id}));
    }

    // const nickName = JSON.parse(sessionStorage.getItem('user')!).nickname
    const userName = comment.items.userName;
    const userImg = "http://localhost:3000/" + comment.items.userImgUrl;
    const commentDate = comment.items.date;
    const commentText = comment.items.comment;
    const heart = comment.items.liked;
    const heartNum = comment.items.likes;
    const best = comment.items.best;

    // 좋아요 눌렀을 때 내가 이미 좋아한 댓글이면 좋아요 취소, 아니면 좋아요 => 좋아요 개수 -1, +1
    const handleHeart = () => {
        dispatch(commentListActions.toggleLike({id:comment.items.id}));
    };

    return (
        <div className={styles.commentItemContainer}>
            <div className={styles.userImgWrapper}>
                <img src={userImg} alt="" className={styles.commentUserImg}/>
            </div>

            <div className={styles.commentInfoWrapper}>
                <div className={styles.commentHeader}>
                    <div className={styles.commentUserName}>
                        {userName}
                    </div>
                    <div className={styles.commentTime}>
                        {commentDate}
                    </div>
                    { best === 1 ? <div className={styles.bestComment}>Best</div> : null}
                </div>

                <div className={styles.commentBody}>
                    <div className={styles.commentText}>
                        {commentText}
                    </div>
                    <div className={styles.iconWrapper}>
                        {heart===1 ? <Icon icon="clarity:heart-solid" className={styles.heartFilledIcon} onClick={() => {handleHeart()}}/> : <Icon icon="clarity:heart-line" className={styles.heartIcon} onClick={()=> {handleHeart()}}/>}
                    </div>
                </div>

                <div className={styles.userReaction}>
                    <div>
                        좋아요 {heartNum}개
                    </div>
                    <div>
                        답글 달기
                    </div>
                    {"단발머리 부엉이"===userName ? <div onClick={() => deleteCommentHandler()}>삭제</div>: null}
                </div>
            </div>
        </div>
    );
};

export default CommentItem;