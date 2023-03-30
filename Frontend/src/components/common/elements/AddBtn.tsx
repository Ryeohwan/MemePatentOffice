import styles from './Btn.module.css'
import addIcon from 'assets/icon_add.png'

const AddBtn: React.FC = () => {
    return (
        <div className={styles.btnContainer}>
            <img src={addIcon} className={styles.addIcon} alt="Add"/>
        </div>
    );
};

export default AddBtn;