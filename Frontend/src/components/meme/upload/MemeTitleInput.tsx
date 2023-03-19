import { useEffect, useState } from "react";
import styles from "./MemeTitleInput.module.css";

const MemeTitleInput: React.FC = () => {
  const [titleInput, setTitleInput] = useState("");
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
  };

  // 임시 loading
  let loading: boolean = true;

  // text 변할때마다 1초 후 중복검사 api
  useEffect(() => {}, [titleInput]);

  return (
    <div className={styles.titleInputContainer}>
      <div className={styles.inputContainer}>
        <input
          className={styles.inputBox}
          value={titleInput}
          onChange={changeHandler}
        />
        {titleInput && loading && (
          <div className={styles.spinnerContainer}>
            <i className="pi pi-spin pi-spinner" />
          </div>
        )}
      </div>
      <p className={styles.explanation}>
        이미지 밈의 제목 혹은 텍스트 밈을 입력하세요.
      </p>
    </div>
  );
};

export default MemeTitleInput;
