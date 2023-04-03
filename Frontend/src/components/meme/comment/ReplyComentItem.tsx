import React from "react";
import useAxios from "hooks/useAxios";
import { useDispatch } from "react-redux";
import { commentListActions } from "store/commentList";
import styles from "./ReplyCommentItem.module.css";

interface ReplyCommentItemProps {
    writerImg: string;
    writerNickname: string;
    createdAt: string;
    content: string;
    userNickname: string;
    userId: number;
    memeid: number;
    id: number;
};


const ReplyCommentItem:React.FC<ReplyCommentItemProps> = ({ writerImg, writerNickname, createdAt, content, userNickname, userId, memeid, id }) => {
  const {sendRequest} = useAxios();
  const dispatch = useDispatch();


  const deleteReplyHandler = () => {
    sendRequest({
      url: "/api/mpoffice/meme/comment/delete",
      method: "POST",
      data: {
        userId: userId,
        memeId: memeid,
        commentId: id
      }
    });
    dispatch(commentListActions.replyDeleteHandler(id));
  };

  return (
    <div className={styles.commentItemContainer}>
      <div className={styles.userImgWrapper}>
        <img src={writerImg} alt="" className={styles.commentUserImg} />
      </div>

      <div className={styles.commentInfoWrapper}>
        <div className={styles.commentHeader}>
          <div className={styles.commentUserName}>{writerNickname}</div>
          <div className={styles.commentTime}>{createdAt}</div>
        </div>

        <div className={styles.commentBody}>
          <div className={styles.commentText}>{content}</div>
        </div>

        <div className={styles.userReaction}>
          {userNickname === writerNickname && <div onClick={deleteReplyHandler}>삭제</div>}
        </div>
      </div>
    </div>
  );
};

export default ReplyCommentItem;
