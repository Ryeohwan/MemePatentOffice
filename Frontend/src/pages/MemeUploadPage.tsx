// meme upload page (/meme-upload)
import MemeTitleInput from "components/meme/upload/MemeTitleInput";
import MemeImageInput from "components/meme/upload/MemeImageInput";
import MemeInfoInput from "components/meme/upload/MemeInfoInput";
import MemeUploadBtn from "components/meme/upload/MemeUploadBtn";

import styles from "./MemeUploadPage.module.css";

const MemeUploadPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <p className={styles.pageHeader}>나만의 밈 NFT로 등록하기</p>
      <MemeTitleInput />
      <MemeImageInput />
      <MemeInfoInput />
      <MemeUploadBtn />
    </div>
  );
};

export default MemeUploadPage;
