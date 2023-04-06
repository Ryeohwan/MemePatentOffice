import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { submitMeme } from "store/auctionUpload";
import { RootState } from "store/configStore";

import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import useAxios from "hooks/useAxios";
import UploadDropDown from "./UploadDropDown";
import check from "assets/icon_check.png";
import styles from "components/auction/upload/UploadModal.module.css";
import UploadTime from "./UploadTime";
import UploadPrice from "./UploadPrice";
import CheckingModal from "./CheckingModal";

interface UploadModalProps {
  modalHandler: (visible: boolean) => void;
  visible: boolean;
}

const UploadModal: React.FC<UploadModalProps> = ({visible, modalHandler}) => {
  const [checkModalVisible, setCheckModalVisible] = useState<boolean>(false); // 유효성 검사 모달 보여주는 변수
  const {data, status, sendRequest} = useAxios()
  const submitMeme = useSelector<RootState, submitMeme>(
    (state) => state.auctionUpload.submitMeme
  ); // 제출 객체

  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    setIsValid(
      !!(
        submitMeme.memeId &&
        submitMeme.startingPrice &&
        submitMeme.startDateTime &&
        isCheck
      )
    );
  }, [submitMeme, isCheck]);

  //최종 제출 누르면 모달 키는 함수
  const controlCheckModal = async (visible: boolean) => {
    setCheckModalVisible(visible);
    const data = {
      sellerId: submitMeme.sellerId,
      memeId: submitMeme.memeId,
      startingPrice: submitMeme.startingPrice,
      startDateTime: new Date(submitMeme.startDateTime! )
    }
    const time_diff = 9*60*60*1000
    const cur_date = new Date(submitMeme.startDateTime!)
    // console.log(data)
    const utc = cur_date.getTime()
    // console.log(utc+time_diff)
    // console.log(new Date(utc))
    // console.log(new Date(utc+time_diff ))
    await sendRequest({
      url: `/api/auction/register`,
      method: "POST",
      data: {
        sellerId: submitMeme.sellerId,
        memeId: submitMeme.memeId,
        startingPrice: submitMeme.startingPrice,
        startDateTime: new Date(utc+time_diff )
      }
    })
    setCheckModalVisible(false)
  };

  useEffect(()=>{
    if(status === 201){
      modalHandler(false)
    }
  },[status])
  
  return (
    <>
      <Dialog
        header="경매 등록"
        className={styles.modal}
        visible={visible}
        onHide={() => {
          modalHandler(false)
        }}
        blockScroll={true}
      >
        <div className={styles.wrapper}>
          <div className={styles.dropDown}>
            <p>경매 등록 밈</p>
            <UploadDropDown visible={visible}/>
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
                  if (e.checked === true || e.checked === false)
                    setIsCheck(e.checked);
                }}
                checked={isCheck}
              ></Checkbox>
            </div>
          </div>
        </div>
        <div className={styles.submit}>
          <div
            className={isValid ? styles.submitTrue : styles.submitFalse}
            onClick={() => {
              if (isValid) controlCheckModal(true);
            }}
          >
            <img src={check} alt="#" />
          </div>
        </div>
      </Dialog>
      <CheckingModal
        checkModalVisible={checkModalVisible}
        controlCheckModal={controlCheckModal}
        textInput="경매 가능한 밈인지 확인 중입니다..."
      />
    </>
  );
};

export default UploadModal;
