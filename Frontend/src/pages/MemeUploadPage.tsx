// meme upload page (/meme-upload)
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { memeUploadActions } from "store/memeUpload";
import useAxios from 'hooks/useAxios';

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
  const navigate = useNavigate();

  // 등록가능한 사람인지 확인하는 모달
  const [checkModalVisible, setCheckModalVisible] = useState<boolean>(false);
  const controlCheckModal = (visible: boolean) => {
    setCheckModalVisible(visible);
  };

  // 밈 등록 가능한 사람인지 확인하는 axios
  const { data, status, sendRequest } = useAxios();

  const checkHandler = async () => {
    controlCheckModal(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    // MetaMask 계정 연결되어 있는지 확인
    if (!JSON.parse(
      sessionStorage.getItem("user")!
    ).walletAddress) {
      alert('MetaMask를 연결하세요.')
      controlCheckModal(false);
      navigate(-1)
      return;
    }

    // 밈 등록 가능한 사람인지 확인하는 axios 보냄
    sendRequest({url: `/api/mpoffice/user/check/${JSON.parse(sessionStorage.user).nickname}`})
  }

  // status 바꼈을때 실행
  useEffect(() => {
    if (status && status !== 200) {
      alert('잠시 후 다시 시도해주세요.')
      controlCheckModal(false);
      navigate(-1)
    }
    controlCheckModal(false);
    if (data === false) {
      alert('하루 할당량을 초과하셨습니다.')
      navigate(-1)
    }
  }, [status])

  useEffect(() => {
    // mount 될때 loading 띄우고 등록 가능한사람인지 먼저 확인
    checkHandler();

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
        textInput="등록이 가능한지 확인 중입니다."
      />
    </>
  );
};

export default MemeUploadPage;
