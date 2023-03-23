import React from "react";
import styles from "./MemeDetailPage.module.css";

const MemeDetailPage: React.FC = () => {
  return (
    <div className={styles.memeDetailPage}>
      <div className={styles.auctionBtnWrapper}>
        <div className={styles.alarmBtn}>경매 알림 받기</div>
        <div className={styles.auctionInfoBtn}>12월 28일 13시 경매 예정</div>
      </div>
      <div className={styles.memeTitle}>귀여운 토토로 삼형제와 발랄한 자매 사츠키, 메이의 우당탕탕 가족사진입니다</div>
      <div className={styles.memeTimeView}>
        <span>2023.03.31 17:44</span>
        <span>조회수 689,982</span>
      </div>
      <div className={styles.memeImgWrapper}>
        <img src="http://localhost:3000/totoro.jpg" alt="" className={styles.memeImg}/>
      </div>
      <div>
        <div>이런 뜻이에요!</div>
        <div className={styles.memeDescription}>나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다.</div>
      </div>
      <div>
        <div>최초 등록자</div>
        <div>단발머리 부엉이</div>
      </div>
      <div>
        <div>현재 소유자</div>
        <div>5조의 햇살</div>
      </div>
      <div>
        <div>숫자</div>
        <div>하트</div>
        <div>깨진하트</div>
        <div>숫자</div>
      </div>
      <div>(내nft일때)경매 등록하기 버튼</div>
      <div>거래 내역 리스트</div>
      <div>댓글 리스트</div>
    </div>
  );
};

export default MemeDetailPage;
