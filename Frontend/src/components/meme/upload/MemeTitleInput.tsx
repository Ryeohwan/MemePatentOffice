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
  const titleChecked = useSelector<RootState, boolean>(state => state.memeUpload.titleChecked)
  const titleState = useSelector<RootState, boolean>(state => state.memeUpload.titleState)

  // 임시 loading -> useAxios 사용할거임
  const [loading, setLoading] = useState(false);

  // text keyup 할때 1초 후 중복검사 api
  useEffect(() => {
    // 유해성검사 실패해서 돌아왔는데, input 바뀐 경우 -> true로 변경
    if (!titleState) dispatch(memeUploadActions.setTitleState(true));

    if (!input) return;
    setLoading(true);
    const identifier = setTimeout(() => {
      // 중복검사 api 임시로 true 보내기
      console.log("중복검사 보냄", input);
      dispatch(memeUploadActions.setTitleChecked(true));
      setLoading(false);

    }, 1000);
    return () => {
      clearTimeout(identifier);
    };
  }, [input]);


  return (
    // 바로 밑줄 css checked 값에 loadnig 추가해야함 
    <div className={`${styles.titleInputContainer}`}>    
      <div className={`${styles.inputContainer} ${((input && !titleChecked) || !titleState) && styles.errorBox}`}>
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
      
      <div className={`${styles.errorMsg}`}>
        {/* title checked에 대한 loading도 false여야함 -> axios 들어오면 추후 수정 */}
        {input && !titleChecked && <p>중복된 밈입니다.</p>}
        {!titleState && <p>유해성 검사를 통과하지 못했습니다.</p>}
      </div>
    </div>
  );
};

export default MemeTitleInput;
