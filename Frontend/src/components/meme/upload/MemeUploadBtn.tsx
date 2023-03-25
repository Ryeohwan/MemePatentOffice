import SubmitBtn from 'components/common/SubmitBtn';
import styles from './MemeUploadBtn.module.css'

// meme-upload page에서 submit 하는 버튼
const MemeUploadBtn: React.FC = () => {
    // click하면 input 확인 -> 유해성검사  -> nft 등록 / 백 api
    const uploadHandler = () => {
        console.log('upload!')
    }
    
    return (
        <div className={styles.uploadBtnContainer}>
            <div className={styles.btnContainer} onClick={uploadHandler}>
                <SubmitBtn />
            </div>
        </div>  
    );
};

export default MemeUploadBtn;