// meme upload page (/meme-upload)
import {useEffect} from 'react';
import {useDispatch } from "react-redux";
import { memeUploadActions } from "store/memeUpload";

import MemeTitleInput from "components/meme/upload/MemeTitleInput";
import MemeImageInput from "components/meme/upload/MemeImageInput";
import MemeInfoInput from "components/meme/upload/MemeInfoInput";
import MemeSituationInput from "components/meme/upload/MemeSituationInput";
import MemeCheckBox from "components/meme/upload/MemeCheckBox";
import MemeUploadBtn from "components/meme/upload/MemeUploadBtn";

import styles from "./MemeUploadPage.module.css";

const MemeUploadPage: React.FC = () => {
  const dispatch = useDispatch();

  // unmount 될때 redux 초기화 시켜야함
  useEffect(() => {
    return () => {
      dispatch(memeUploadActions.resetData());
    };
  }, [])
  
  
  return (
    <div className={styles.pageContainer}>
      <p className={styles.pageHeader}>나만의 밈 NFT로 등록하기</p>
      <MemeTitleInput />
      <MemeImageInput />
      <MemeInfoInput />
      <MemeSituationInput />
      <div className = {styles.pageFooter}>
        <MemeCheckBox />
        <MemeUploadBtn />
      </div>
    </div>
  );
};

export default MemeUploadPage;
