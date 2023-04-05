// 내가 쓴 댓글 page (/setting/history/comment)
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAppDispatch } from "hooks/useAppDispatch";

import { RootState } from "store/configStore";
import {
  historyActions,
  myCommentList,
  getHistoryAxiosThunk,
} from "store/history";
import { useInView } from "react-intersection-observer";

import CommentHistoryItem from "components/settings/history/CommentHistoryItem";
import { ScrollTop } from "primereact/scrolltop";
import { Divider } from "primereact/divider";

import styles from "pages/setting/CommentHistoryPage.module.css";
import "pages/setting/Setting.css";

const CommentHistoryPage: React.FC = () => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  const today = useSelector<RootState, myCommentList[]>(
    (state) => state.history.today
  );
  const week = useSelector<RootState, myCommentList[]>(
    (state) => state.history.week
  );
  const previous = useSelector<RootState, myCommentList[]>(
    (state) => state.history.previous
  );
  const hasNext = useSelector<RootState, boolean>(
    (state) => state.history.hasNext
  );
  const loading = useSelector<RootState, boolean>(
    (state) => state.history.loading
  );
  const [lastRef, setLastRef] = useState(-1);

  // 처음 랜더링될때 초기화 후 데이터 불러오기
  useEffect(() => {
    dispatch(historyActions.openPage());
    appDispatch(getHistoryAxiosThunk(-1));
  }, []);

  // 무한스크롤
  const [ref, inView] = useInView({
    threshold: 1,
    delay: 300,
  });

  useEffect(() => {
    if (inView && lastRef !== -1) {
      appDispatch(getHistoryAxiosThunk(lastRef));
    }
  }, [inView]);

  useEffect(() => {
    if (previous.length > 0) {
      setLastRef(previous[previous.length - 1].id);
    } else if (week.length > 0) {
      setLastRef(week[week.length - 1].id);
    } else if (today.length > 0) {
      setLastRef(today[today.length - 1].id);
    }
  }, [previous, week, today]);

  return (
    <div className="wrapper">
      <p className="pageName">내가 쓴 댓글</p>
      <Divider className="divider" />

      {today.length > 0 && (
        <>
          <p className={styles.date}>오늘</p>
          {today.length > 0 &&
            today.map((item) => {
              return <CommentHistoryItem item={item} key={item.id} />;
            })}
        </>
      )}

      {week.length > 0 && (
        <>
          <Divider className="divider" />
          <p className={styles.date}>이번 주</p>
          {week.map((item) => {
            return <CommentHistoryItem item={item} key={item.id} />;
          })}
        </>
      )}

      {previous.length > 0 && (
        <>
          <Divider className="divider" />
          <p className={styles.date}>이전</p>
          {previous.map((item) => {
            return <CommentHistoryItem item={item} key={item.id} />;
          })}
        </>
      )}

      {/* 무한스크롤 감지 옵저버 */}
      <div ref={hasNext ? ref : null} />

      <ScrollTop
        threshold={100}
        icon="pi pi-arrow-up text-base"
        style={{
          position: "fixed",
          marginLeft: "0",
          bottom: "16px",
          right: "16px",
          background: "var(--button-color)",
          width: "44px",
          height: "44px",
        }}
      />
    </div>
  );
};

export default CommentHistoryPage;
