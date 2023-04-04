import React, { useState, useEffect } from "react";

import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import { useDispatch } from "react-redux";
import { auctionUploadActions } from "store/auctionUpload";

import styles from "components/auction/upload/UploadTime.module.css";

const UploadTime: React.FC = () => {
  const dispatch = useDispatch();
  const nextDay = 24 * 60 * 60 * 1000;
  const [timeValue, setTimeValue] = useState<Date>(
    new Date(+new Date() + nextDay)
  );

  useEffect(() => {
    dispatch(auctionUploadActions.selectTime(timeValue.toISOString()));
  }, [timeValue]);
  
  return (
    <>
      <Calendar
        value={timeValue}
        onChange={(e: CalendarChangeEvent) => {
          console.log(e.value)
          if (e.value != undefined) {
            setTimeValue(e.value as Date);
          }
        }}
        minDate={new Date(+new Date() + 24 * 60 * 60 * 1000)}
        showIcon
        touchUI
        className={styles.calendar}
        showTime
        hourFormat="24"
        hideOnDateTimeSelect
        stepMinute={5}
      />
    </>
  );
};

export default UploadTime;
