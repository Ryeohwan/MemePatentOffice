import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import styles from "./CommentItem.module.css";
import { commentType, replyType } from "store/commentList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { commentListActions } from "store/commentList";
import ReplyCommentItem from "./ReplyComentItem";

interface CommentType {
  items: commentType;
}

const CommentItem: React.FC<CommentType> = (comment) => {
  const dispatch = useDispatch();

  // const deleteCommentHandler = () => {
  //   dispatch(commentListActions.commentDeleteHandler({ id: comment.items.id }));
  // };

  // const nickName = JSON.parse(sessionStorage.getItem('user')!).nickname
  const userName = comment.items.userName;
  const commentId = comment.items.id;
  const userImg = "http://localhost:3000/" + comment.items.userImgUrl;
  const commentDate = comment.items.date;
  const commentText = comment.items.comment;
  const heart = comment.items.liked;
  const heartNum = comment.items.likes;
  const best = comment.items.best;
  const replyCnt = comment.items.replyCommentCnt;

  // 좋아요 눌렀을 때 내가 이미 좋아한 댓글이면 좋아요 취소, 아니면 좋아요 => 좋아요 개수 -1, +1
  const handleHeart = () => {
    dispatch(commentListActions.toggleLike({ id: comment.items.id }));
  };

  // 대댓글 배열 get: dummy  data => 답글 더보기 클릭 시 commentId로 해당 댓글의 대댓글만 get
  const replyCommentList = useSelector<RootState, replyType[]>((state) => state.commentList.replyCommentList);

  const [clickReply, setClickReply] = useState(false);

  const onClickReply = () => {
    setClickReply(!clickReply); 
  };

  return (
    <div className={styles.commentItemContainer}>
      <div className={styles.userImgWrapper}>
        <img src={userImg} alt="" className={styles.commentUserImg} />
      </div>

      <div className={styles.commentInfoWrapper}>
        <div className={styles.commentHeader}>
          <div className={styles.commentUserName}>{userName}</div>
          <div className={styles.commentTime}>{commentDate}</div>
          {best === 1 && <div className={styles.bestComment}>Best</div>}
        </div>

        <div className={styles.commentBody}>
          <div className={styles.commentText}>{commentText}</div>
          <div className={styles.iconWrapper}>
            {heart === 1 ? (
              <Icon
                icon="clarity:heart-solid"
                className={styles.heartFilledIcon}
                onClick={() => {
                  handleHeart();
                }}
              />
            ) : (
              <Icon
                icon="clarity:heart-line"
                className={styles.heartIcon}
                onClick={() => {
                  handleHeart();
                }}
              />
            )}
          </div>
        </div>

        <div className={styles.userReaction}>
          <div>좋아요 {heartNum}개</div>
          <div>답글 달기</div>
          {"단발머리 부엉이" === userName ? (
            <div onClick={() => {}}>삭제</div>
          ) : null}
        </div>

        {replyCnt !== 0 && (
          <div>
            {!clickReply ? (
              <div className={styles.replyContainer}>
                <div>
                  <hr />
                </div>
                <div onClick={onClickReply}> 답글 {replyCnt}개 더보기 </div>
              </div>
            ) : (
              <div>
                <div className={styles.replyContainer}>
                  <div>
                    <hr />
                  </div>
                  <div onClick={onClickReply}> 답글 숨기기 </div>
                </div>
                {replyCommentList.map((item) => {
                  return (
                    <ReplyCommentItem
                      key={commentId}
                      writerImg={item.writerImg}
                      writerNickname={item.writerNickname}
                      createdAt={item.createdAt}
                      content={item.comment}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
