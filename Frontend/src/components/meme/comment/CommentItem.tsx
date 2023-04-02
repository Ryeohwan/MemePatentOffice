import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import styles from "./CommentItem.module.css";
import { commentType } from "store/commentList";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { commentListActions } from "store/commentList";
import { getReplyListAxiosThunk } from "store/commentList";
import ReplyCommentItem from "./ReplyComentItem";
import useAxios from "hooks/useAxios";
import { useAppDispatch } from "hooks/useAppDispatch";

interface CommentType {
  items: commentType;
}

const CommentItem: React.FC<CommentType> = (comment) => {
  const userNickname = JSON.parse(sessionStorage.getItem('user')!).nickname;
  const userId = JSON.parse(sessionStorage.user).userId;
  const params = useParams();
  const memeid = parseInt(params.meme_id!, 10);

  const commentWriterName = comment.items.nickname;
  const commentId = comment.items.id;
  const writerProfileImg = comment.items.profileImage;
  const date = new Date(comment.items.date);
  const commentDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
//   date = new Date('2013-03-10T02:00:00Z');
// date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
  const commentText = comment.items.content;
  const heart = comment.items.liked;
  const heartNum = comment.items.heartCnt;
  const best = comment.items.best;
  const replyCnt = comment.items.replyCommentCnt;
  const replyCommentList = useSelector<RootState, commentType[]>((state) => state.commentList.replyCommentList);

  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const { sendRequest: postCommentRequest } = useAxios();
  const { sendRequest: deleteCommentRequest } = useAxios();
  const [clickViewReply, setClickViewReply] = useState(false);
  const [heartStatus, setHeartStatus] = useState(heart);

  // 좋아요 눌렀을 때 내가 이미 좋아한 댓글이면 좋아요 취소, 아니면 좋아요 => 좋아요 개수 -1, +1
  const handleHeart = () => {
    setHeartStatus(!heartStatus);
  };
  
  useEffect(() => {
    dispatch(commentListActions.toggleLike({ id: comment.items.id }));
    console.log(heartStatus)
    postCommentRequest({
      url: `/api/mpoffice/meme/comment/like?state=${heartStatus}`,
      method: "POST",
      data: {
        commentId: commentId,
        userId: userId
      }
    });
  }, [heartStatus]);

  // 답글달기 클릭하면 redux의 parentId, parentName 바꿈
  const uploadReply = () => {
    dispatch(commentListActions.changeNowParentId(commentId));
    dispatch(commentListActions.changeNowParentName(commentWriterName));
  };
  
  // 답글 더보기 눌렀을 때 답글 가져옴
  const onClickViewReply = () => {
    appDispatch(getReplyListAxiosThunk(memeid, commentId));
    setClickViewReply(!clickViewReply);
  };
  
  const onClickDelete = () => {
    deleteCommentRequest({
      url: "/api/mpoffice/meme/comment/delete",
      method: "POST",
      data: {
        userId: userId,
        memeId: memeid,
        commentId: commentId
      }
    });
    dispatch(commentListActions.commentDeleteHandler(comment.items.id));
  };


  return (
    <div className={styles.commentItemContainer}>
      <div className={styles.userImgWrapper}>
        <img src={writerProfileImg} alt="" className={styles.commentUserImg} />
      </div>

      <div className={styles.commentInfoWrapper}>
        <div className={styles.commentHeader}>
          <div className={styles.commentUserName}>{commentWriterName}</div>


          {/* 날짜 형식 바꾸고 넣기 */}
          <div className={styles.commentTime}>3주 전</div>
          {best === 1 && <div className={styles.bestComment}>Best</div>}
        </div>

        <div className={styles.commentBody}>
          <div className={styles.commentText}>{commentText}</div>
          <div className={styles.iconWrapper} onClick={handleHeart}>
            {heartStatus ? (
              <Icon
                icon="clarity:heart-solid"
                className={styles.heartFilledIcon}
              />
            ) : (
              <Icon
                icon="clarity:heart-line"
                className={styles.heartIcon}
              />
            )}
          </div>
        </div>

        <div className={styles.userReaction}>
          {heartNum !==0 && <div>좋아요 {heartNum}개</div>}
          <div onClick={uploadReply}>답글 달기</div>
          {userNickname === commentWriterName ? (
            <div onClick={onClickDelete}>삭제</div>
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
                      writerImg={item.profileImage}
                      writerNickname={item.nickname}
                      createdAt={item.date}
                      content={item.content}
                      userNickname={userNickname}
                      userId={userId}
                      memeid={memeid}
                      id={item.id}
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
