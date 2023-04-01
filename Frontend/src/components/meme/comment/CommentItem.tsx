import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import styles from "./CommentItem.module.css";
import { commentType, replyType } from "store/commentList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { commentListActions } from "store/commentList";
import ReplyCommentItem from "./ReplyComentItem";
import useAxios from "hooks/useAxios";
import { useAppDispatch } from "hooks/useAppDispatch";

interface CommentType {
  items: commentType;
}

const CommentItem: React.FC<CommentType> = (comment) => {
  const userNickname = JSON.parse(sessionStorage.getItem('user')!).nickname;
  const userId = JSON.parse(sessionStorage.user).userId;

  const commentWriterName = comment.items.nickname;
  const commentId = comment.items.id;
  const writerProfileImg = comment.items.profileImage;
  const commentDate = comment.items.date;
  const commentText = comment.items.content;
  const heart = comment.items.liked;
  const heartNum = comment.items.heartCnt;
  const best = comment.items.best;
  const replyCnt = comment.items.replyCommentCnt;
  const replyCommentList = useSelector<RootState, replyType[]>((state) => state.commentList.replyCommentList);

  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const { sendRequest } = useAxios();
  const [clickViewReply, setClickViewReply] = useState(false);
  const [heartStatus, setHeartStatus] = useState(heart);
  

  // 좋아요 눌렀을 때 내가 이미 좋아한 댓글이면 좋아요 취소, 아니면 좋아요 => 좋아요 개수 -1, +1
  const handleHeart = () => {
    dispatch(commentListActions.toggleLike({ id: comment.items.id }));
    if (heartStatus === true) {
      setHeartStatus(false);
    } else {
      setHeartStatus(true);
    };
    sendRequest({
      url: `/api/mpoffice/meme/comment/like?state=${heartStatus}`,
      method: "POST",
      data: {
        commentId: commentId,
        userId: userId
      }
    });
  };

  // 답글달기 클릭하면 redux의 parentId, parentName 바꿈
  const uploadReply = () => {
    dispatch(commentListActions.changeNowParentId(commentId));
    dispatch(commentListActions.changeNowParentName(commentWriterName));
  };
  
  // 답글 더보기 눌렀을 때 답글 가져옴
  const onClickViewReply = () => {

    setClickViewReply(!clickViewReply);
  };
  
  // const deleteCommentHandler = () => {
  //   dispatch(commentListActions.commentDeleteHandler({ id: comment.items.id }));
  // };
  


  return (
    <div className={styles.commentItemContainer}>
      <div className={styles.userImgWrapper}>
        <img src={writerProfileImg} alt="" className={styles.commentUserImg} />
      </div>

      <div className={styles.commentInfoWrapper}>
        <div className={styles.commentHeader}>
          <div className={styles.commentUserName}>{commentWriterName}</div>
          <div className={styles.commentTime}>{commentDate}</div>
          {best === 1 && <div className={styles.bestComment}>Best</div>}
        </div>

        <div className={styles.commentBody}>
          <div className={styles.commentText}>{commentText}</div>
          <div className={styles.iconWrapper}>
            {heart === false ? (
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
          {heartNum !==0 && <div>좋아요 {heartNum}개</div>}
          <div onClick={uploadReply}>답글 달기</div>
          {userNickname === commentWriterName ? (
            <div onClick={() => {}}>삭제</div>
          ) : null}
        </div>

        {replyCnt !== 0 && (
          <div>
            {!clickViewReply ? (
              <div className={styles.replyContainer}>
                <div>
                  <hr />
                </div>
                <div onClick={onClickViewReply}> 답글 {replyCnt}개 더보기 </div>
              </div>
            ) : (
              <div>
                <div className={styles.replyContainer}>
                  <div>
                    <hr />
                  </div>
                  <div onClick={onClickViewReply}> 답글 숨기기 </div>
                </div>
                {replyCommentList.map((item) => {
                  return (
                    <ReplyCommentItem
                      key={commentId}
                      writerImg={item.writerImg}
                      writerNickname={item.writerNickname}
                      createdAt={item.createdAt}
                      content={item.content}
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
