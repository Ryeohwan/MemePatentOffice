import React from "react";
import styles from "./ReplyCommentItem.module.css";

interface ReplyCommentItemProps {
    writerImg: string;
    writerNickname: string;
    createdAt: string;
    content: string;
};


const ReplyCommentItem:React.FC<ReplyCommentItemProps> = ({ writerImg, writerNickname, createdAt, content }) => {
  const writerImgUrl = "http://localhost:3000/" + writerImg;
  
  return (
    <div className={styles.commentItemContainer}>
      <div className={styles.userImgWrapper}>
        <img src={writerImgUrl} alt="" className={styles.commentUserImg} />
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
          <div>답글 달기</div>
          {"단발머리 부엉이" === writerNickname ? (
            // <div onClick={deleteCommentHandler}>삭제</div>
            <div>삭제</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ReplyCommentItem;
