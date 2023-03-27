import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { memeUploadActions } from "store/memeUpload";
import { RootState } from "store/configStore";

import SubmitBtn from "components/common/SubmitBtn";
import CheckingModal from "components/auction/upload/CheckingModal";

import styles from "./MemeUploadBtn.module.css";

// meme-upload page에서 submit 하는 버튼
const MemeUploadBtn: React.FC = () => {
  const dispatch = useDispatch();
  const title = useSelector<RootState, string>(
    (state) => state.memeUpload.title
  );
  const titleChecked = useSelector<RootState, boolean>(
    (state) => state.memeUpload.titleChecked
  );
  const imgUrl = useSelector<RootState, string>(
    (state) => state.memeUpload.imgUrl
  );
  const info = useSelector<RootState, string>((state) => state.memeUpload.info);
  const situation = useSelector<RootState, string>(
    (state) => state.memeUpload.situation
  );
  const checkbox = useSelector<RootState, boolean>(
    (state) => state.memeUpload.checkbox
  );

  // 유효성 검사 모달
  const [checkModalVisible, setCheckModalVisible] = useState<boolean>(false);
  const controlCheckModal = (visible: boolean) => {
    setCheckModalVisible(visible);
  };

  // click하면 input 확인 -> 유해성검사  -> nft 등록 / 백 api
  const uploadHandler = () => {
    // title 중복검사 통과 + 나머지 모든 값 존재 시에만 upload
    if (!(titleChecked && imgUrl && info && situation && checkbox)) {
      alert("입력값을 확인하세요.");
      return;
    }

    // 유해성 검사 해야함
    controlCheckModal(true);
    // 실패하면 실패한 항목의 state false로 바꾸기
    // 통과하면 업로드하고 밈 디테일로 이동

    // 일단 임시 time out
    const identifier = setTimeout(() => {
      dispatch(memeUploadActions.setSituationState(false));
      controlCheckModal(false);
    }, 1000);
  };

  return (
    <>
      <div className={styles.uploadBtnContainer}>
        <div className={styles.btnContainer} onClick={uploadHandler}>
          <SubmitBtn />
        </div>
      </div>
      <CheckingModal
        checkModalVisible={checkModalVisible}
        controlCheckModal={controlCheckModal}
        textInput="유효성검사 중입니다..."
      />
    </>
  );
};

export default MemeUploadBtn;
