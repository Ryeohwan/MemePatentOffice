import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { auctionUploadActions } from "store/auctionUpload";
import { submitMeme } from "store/auctionUpload";
import { RootState } from "store/configStore";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import UploadDropDown from "./UploadDropDown";
import check from 'assets/icon_check.png'
import styles from "components/auction/upload/UploadModal.module.css";
import UploadTime from "./UploadTime";
import UploadPrice from "./UploadPrice";

const UploadModal: React.FC = () => {
  // 나중에 props로 바꾸기 홈갔다오면 켜져있어서 문제
  const visible = useSelector<RootState, boolean>(
    (state) => state.auctionUpload.isVisible
  ); 

  const submitMeme = useSelector<RootState, submitMeme>(state=>state.auctionUpload.submitMeme)
  const dispatch = useDispatch();
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false)
  useEffect(()=>{
    setIsValid(!!(submitMeme.id && submitMeme.lowPrice && submitMeme.auctionDate && isCheck))
  },[submitMeme, isCheck])
  return (
    <Dialog
      header="경매 등록"
      className={styles.modal}
      visible={visible}
      onHide={() => {
        dispatch(auctionUploadActions.controlModal({ visible: false }));
      }}
      blockScroll={true}
    >
      <div className={styles.wrapper}>

        <div className={styles.dropDown}>
          <p>경매 등록 밈</p>
          <UploadDropDown />
        </div>

        <div className={styles.calendar}>
          <p>경매 일정</p>
          <UploadTime />
        </div>

        <div className={styles.price}>
          <p>최저가</p>
          <UploadPrice />
        </div>

        <div className={styles.checkboxWrapper}>
          <p>경매를 등록한 이후에는 수정 및 취소가 불가합니다.</p>
          <div>
            <span>이에 동의 하십니까?</span>
            <Checkbox
              className={styles.checkbox}
              onChange={(e: CheckboxChangeEvent) => {
                console.log(e);
                if (e.checked === true || e.checked === false)
                  setIsCheck(e.checked);
              }}
              checked={isCheck}
            ></Checkbox>
          </div>
        </div>
      </div>
      <div className={styles.submit}>
        <div className={ isValid ? styles.submitTrue : styles.submitFalse}>
          <img src={check} alt="#"/>
        </div>
      </div>
    </Dialog>
  );
};

export default UploadModal;
