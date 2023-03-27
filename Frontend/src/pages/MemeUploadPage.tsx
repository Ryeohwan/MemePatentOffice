// meme upload page (/meme-upload)
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { memeUploadActions } from "store/memeUpload";

import CheckingModal from "components/auction/upload/CheckingModal";
import MemeTitleInput from "components/meme/upload/MemeTitleInput";
import MemeImageInput from "components/meme/upload/MemeImageInput";
import MemeInfoInput from "components/meme/upload/MemeInfoInput";
import MemeSituationInput from "components/meme/upload/MemeSituationInput";
import MemeCheckBox from "components/meme/upload/MemeCheckBox";
import MemeUploadBtn from "components/meme/upload/MemeUploadBtn";

import styles from "./MemeUploadPage.module.css";

const MemeUploadPage: React.FC = () => {
  const dispatch = useDispatch();

  // 등록가능한 사람(하루2번)인지 확인하는 모달
  const [checkModalVisible, setCheckModalVisible] = useState<boolean>(false);
  const controlCheckModal = (visible: boolean) => {
    setCheckModalVisible(visible);
  };

  // mount 될때 loading 띄우고 등록 가능한사람인지 먼저 확인
  useEffect(() => {
    controlCheckModal(true);

    // axios 보내기
    // const result = await ...
    // 가능한 상태면 -> checkmodal false
    // 불가능한 상태면 -> checkmodal false / alert -> 밈 사전 페이지 navigate

    // 일단 임시 time out
    const identifier = setTimeout(() => {
      controlCheckModal(false);
    }, 1000);

    // unmount 될때 redux 초기화 시키기
    return () => {
      dispatch(memeUploadActions.resetData());
    };
  }, []);

  return (
    <>
      <div className={styles.pageContainer}>
        <p className={styles.pageHeader}>나만의 밈 NFT로 등록하기</p>
        <MemeTitleInput />
        <MemeImageInput />
        <MemeInfoInput />
        <MemeSituationInput />
        <div className={styles.pageFooter}>
          <MemeCheckBox />
          <MemeUploadBtn />
        </div>
      </div>
      <CheckingModal
        checkModalVisible={checkModalVisible}
        controlCheckModal={controlCheckModal}
        headerInput="검사 중..."
        textInput="등록이 가능한지 확인 중입니다..."
      />
    </>
  );
};

export default MemeUploadPage;
