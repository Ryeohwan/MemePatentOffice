import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { noticeObject } from "store/notice";

import styles from "components/notice/NoticeList.module.css";
import { Divider } from "primereact/divider";
import NoticeItem from "./NoticeItem";

const NoticeList:React.FC = () => {
  const today = useSelector<RootState, noticeObject[]>(
    (state) => state.notice.today
  );
  const week = useSelector<RootState, noticeObject[]>(
    (state) => state.notice.week
  );
  const month = useSelector<RootState, noticeObject[]>(
    (state) => state.notice.month
  );

  return (
    <div className={styles.listWrapper}>
      {today.length > 0 && (
        <div className={styles.todayList}>
          <p>오늘</p>
          {today.map((item,index) => {
            return <NoticeItem key={`${item.date}-${index}`} item={item} />;
          })}
        </div>
      )}
      {week.length > 0 && (
        <>
          <div className={styles.weekList}>
            <p>이번 주</p>
            {week.map((item,index) => {
            return <NoticeItem key={`${item.date}-${index}`} item={item} />;
          })}
          </div>
        </>
      )}
      {month.length > 0 && (
        <>
          <Divider />
          <div className={styles.monthList}>
          <p>이번 달</p>
            {month.map((item,index) => {
            return <NoticeItem key={`${item.date}-${index}`} item={item} />;
          })}
          </div>
        </>
      )}
    </div>
  );
};

export default NoticeList;
