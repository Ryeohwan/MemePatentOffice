// 내가 쓴 댓글 page (/setting/history/comment)
import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/configStore";
import { historyActions } from "store/history";
import { myCommentList } from "store/history";

import styles from "pages/setting/CommentHistoryPage.module.css";
import "pages/setting/Setting.css";
import { Divider } from "primereact/divider";
import CommentHistoryItem from "components/settings/history/CommentHistoryItem";

const CommentHistoryPage: React.FC = () => {
  const today = useSelector<RootState, myCommentList[]>(
    (state) => state.history.today
  );
  const week = useSelector<RootState, myCommentList[]>(
    (state) => state.history.week
  );
  const month = useSelector<RootState, myCommentList[]>(
    (state) => state.history.month
  );

  return (
    <div className="wrapper">
      <p className="pageName">내가 쓴 댓글</p>
      <Divider className="divider" />
      <>
        <p className={styles.date}>오늘</p>
        {today.length > 0 &&
          today.map((item) => {
            return <CommentHistoryItem item={item} />;
          })}
      </>
      {week.length > 0 && (
        <>
          <Divider className="divider" />
          <p className={styles.date}>이번 주</p>
          {week.map((item) => {
            return <CommentHistoryItem item={item} />;
          })}
        </>
      )}

      {month.length > 0 && (
        <>
          <Divider className="divider" />
          <p className={styles.date}>이번 달</p>
          {month.map((item) => {
            return <CommentHistoryItem item={item} />;
          })}
        </>
      )}
    </div>
  );
};

export default CommentHistoryPage;
