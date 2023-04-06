import React from "react";
import useAxios from "hooks/useAxios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { commentListActions } from "store/commentList";
import styles from "./ReplyCommentItem.module.css";
import ElapsedText from "components/common/elements/ElapsedText";

interface ReplyCommentItemProps {
  writerImg: string;
  writerNickname: string;
  createdAt: string;
  content: string;
  userNickname: string;
  userId: number;
  memeid: number;
  id: number;
  deleteReply: (id: number) => void;
}

const ReplyCommentItem: React.FC<ReplyCommentItemProps> = ({
  writerImg,
  writerNickname,
  createdAt,
  content,
  userNickname,
  userId,
  memeid,
  id,
  deleteReply,
}) => {
  const navigate = useNavigate();
  const { sendRequest } = useAxios();
  const dispatch = useDispatch();
  const elapsedText = ElapsedText(createdAt);

  const deleteReplyHandler = () => {
    sendRequest({
      url: "/api/mpoffice/meme/comment/delete",
      method: "POST",
      data: {
        userId: userId,
        memeId: memeid,
        commentId: id,
      },
    });
    console.log("대댓글 id ", id);
  };

  const profileNavigateHandler = (nickname: string) => {
    navigate(`/profile/${nickname}/tab=nft`);
  };

  return (
    <div className={styles.commentItemContainer}>
      <div className={styles.userImgWrapper}>
        <img
          src={writerImg}
          alt=""
          className={styles.commentUserImg}
          onClick={() => profileNavigateHandler(writerNickname)}
        />
      </div>

      <div className={styles.commentInfoWrapper}>
        <div className={styles.commentHeader}>
          <div
            className={styles.commentUserName}
            onClick={() => profileNavigateHandler(writerNickname)}
          >
            {writerNickname}
          </div>
          <div className={styles.commentTime}>{elapsedText}</div>
        </div>

        <div className={styles.commentBody}>
          <div className={styles.commentText}>{content}</div>
          <div className={styles.userReaction}>
            {userNickname === writerNickname && (
              <div onClick={() => deleteReply(id)}>삭제</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyCommentItem;
