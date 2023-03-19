import styles from './MemeInfoInput.module.css'

const MemeInfoInput: React.FC = () => {
    return (
        <div className={styles.infoInputContainer}>
            <div className={styles.inputContainer}>
                <textarea className={styles.inputBox}/>
            </div>
            <p className={styles.explanation}>본인이 등록할 밈에 대한 설명과 밈을 사용할 상황을 최대한 상세히 입력해주세요.</p>
        </div>
    );
};

export default MemeInfoInput;