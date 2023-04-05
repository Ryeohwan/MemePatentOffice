import React from "react";
import { useNavigate } from "react-router-dom";
import ElapsedText from "components/common/elements/ElapsedText";
import { myCommentList } from "store/history";

import styles from "components/settings/history/CommentHistoryItem.module.css";

interface CommentHistoryItemProps {
  item: myCommentList;
}

const CommentHistoryItem: React.FC<CommentHistoryItemProps> = ({ item }) => {
  const navigate = useNavigate();
  const elapsedText = ElapsedText(item.date);

  const clickHandler = () => {
    // meme-detail comment로 이동 (state에 댓글 id)
    navigate(`/meme-detail/${item.memeId}/tab=comment`, {state:{from: "comment"}});
  };

  return (
    <div className={styles.itemWrapper} onClick={clickHandler}>
      <img className={styles.avatar} alt="" src={item.memeImage} />
      <div className={styles.itemInfo}>
        <div className={styles.itemtitle}>
          <p className={styles.title}>{item.memeTitle}</p>
          <p className={styles.elapsedText}>{elapsedText}</p>
        </div>
        <p className={styles.comment}>{item.content}</p>
      </div>
    </div>
  );
};

export default CommentHistoryItem;
