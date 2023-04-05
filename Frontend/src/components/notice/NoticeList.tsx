import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useAppDispatch } from "hooks/useAppDispatch";
import { RootState } from "store/configStore";
import { noticeObject, noticeActions, getNoticeAxiosThunk } from "store/notice";
import { useInView } from "react-intersection-observer";

import NoticeItem from "./NoticeItem";
import { ScrollTop } from "primereact/scrolltop";
import { Divider } from "primereact/divider";
import styles from "components/notice/NoticeList.module.css";

const NoticeList: React.FC = () => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  const today = useSelector<RootState, noticeObject[]>(
    (state) => state.notice.today
  );
  const week = useSelector<RootState, noticeObject[]>(
    (state) => state.notice.week
  );
  const previous = useSelector<RootState, noticeObject[]>(
    (state) => state.notice.previous
  );
  const hasNext = useSelector<RootState, boolean>(
    (state) => state.notice.hasNext
  );
  const loading = useSelector<RootState, boolean>(
    (state) => state.notice.loading
  );
  const [lastRef, setLastRef] = useState(-1);

  // 처음 랜더링될때 초기화 후 데이터 불러오기
  useEffect(() => {
    dispatch(noticeActions.openPage());
    appDispatch(getNoticeAxiosThunk(-1));
  }, []);

  // 무한스크롤
  const [ref, inView] = useInView({
    threshold: 1,
    delay: 300,
  });

  useEffect(() => {
    if (inView && lastRef !== -1) {
      appDispatch(getNoticeAxiosThunk(lastRef));
    }
  }, [inView]);

  useEffect(() => {
    if (previous.length > 0) {
      setLastRef(previous[previous.length - 1].alarmId);
    } else if (week.length > 0) {
      setLastRef(week[week.length - 1].alarmId);
    } else if (today.length > 0) {
      setLastRef(today[today.length - 1].alarmId);
    }
  }, [previous, week, today]);

  return (
    <div className={styles.listWrapper}>
      {today.length > 0 && (
        <div className={styles.todayList}>
          <p>오늘</p>
          {today.map((item) => {
            return <NoticeItem key={item.alarmId} item={item} />;
          })}
        </div>
      )}
      {week.length > 0 && (
        <>
          <div className={styles.weekList}>
            <p>이번 주</p>
            {week.map((item) => {
              return <NoticeItem key={item.alarmId} item={item} />;
            })}
          </div>
        </>
      )}
      {previous.length > 0 && (
        <>
          <Divider />
          <div className={styles.monthList}>
            <p>이전</p>
            {previous.map((item) => {
              return <NoticeItem key={item.alarmId} item={item} />;
            })}
          </div>
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

export default NoticeList;
