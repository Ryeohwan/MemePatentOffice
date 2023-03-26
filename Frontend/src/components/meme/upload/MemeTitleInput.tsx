import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { memeUploadActions } from "store/memeUpload";
import { RootState } from "store/configStore";

import styles from "./MemeTitleInput.module.css";

const MemeTitleInput: React.FC = () => {
  const dispatch = useDispatch();
  
  const input = useSelector<RootState, string>(state => state.memeUpload.title)
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(memeUploadActions.putTitle(e.target.value));
  };

  // 임시 loading -> useAxios 사용할거임
  const [loading, setLoading] = useState(false);

  // text keyup 할때 1초 후 중복검사 api
  useEffect(() => {
    if (!input) return;
    setLoading(true);
    const identifier = setTimeout(() => {
      // 중복검사 api 임시로 true 바꿈
      console.log("중복검사 보냄", input);
      dispatch(memeUploadActions.setTitleChecked(true));
      setLoading(false);

      // 임시로 true 보내기
    }, 1000);
    return () => {
      clearTimeout(identifier);
    };
  }, [input]);


  return (
    <div className={styles.titleInputContainer}>
      <div className={styles.inputContainer}>
        <input
          className={styles.inputBox}
          value={input}
          onChange={changeHandler}
          placeholder="이미지 밈의 제목 혹은 텍스트 밈을 입력하세요."
        />

        {input && loading && (
          <div className={styles.spinnerContainer}>
            <i className="pi pi-spin pi-spinner" />
          </div>
        )}
      </div>

      <p className={styles.explanation}>중복된 밈입니다.</p>
    </div>
  );
};

export default MemeTitleInput;
