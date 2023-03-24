import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import styles from "components/auction/main/FinishModal.module.css";

interface FinishModalProps {}

const FinishModal: React.FC<FinishModalProps> = () => {
  const navigate = useNavigate();
  // 끝나는 시간 더미 데이터
  const finishTime = "2023-03-24 14:16";

  // 모달창
  const [visible, setVisible] = useState<boolean>(false);
  // 남은 시간
  const [time, setTime] = useState<Date>(new Date());
  const [remainTime, setRemainTime] = useState<number>(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => new Date(time.getTime() + 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const day = `${time.getFullYear()}-${(time.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${time.getDate().toString().padStart(2, "0")}`;
    const times = `${time.getHours().toString().padStart(2, "0")}:${time
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    const currentTime = `${day} ${times}`;
    if (currentTime === finishTime) {
      setVisible(true);
      setRemainTime((time)=>time-1)
    }
    if (remainTime === 0){
        navigate('meme-detail/:1')
    }
  }, [time]);

  return (
    <Dialog
      header="경매 마감"
      visible={visible}
      closable={false}
      modal={false}
      className={styles.modal}
      onHide={() => {}}
    >
      <p>nickname 님이 낙찰되었습니다!</p>
      <div>캐릭터</div>
      <p>{remainTime}초 후에 종료...</p>
      <Button>나가기</Button>
    </Dialog>
  );
};

export default FinishModal;
