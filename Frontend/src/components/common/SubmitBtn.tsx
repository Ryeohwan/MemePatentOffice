import styles from './SubmitBtn.module.css'
import checkIcon from 'assets/icon_check.png'

const SubmitBtn: React.FC = () => {
    return (
        <div className={styles.btnContainer}>
            <img src={checkIcon} className={styles.btnIcon} alt="submit"/>
        </div>
    );
};

export default SubmitBtn;