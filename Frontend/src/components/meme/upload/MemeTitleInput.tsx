import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useAxios from 'hooks/useAxios';
import { memeUploadActions } from "store/memeUpload";
import { RootState } from "store/configStore";

import styles from "./MemeTitleInput.module.css";

const MemeTitleInput: React.FC = () => {
  const dispatch = useDispatch();
  
  const input = useSelector<RootState, string>(state => state.memeUpload.title)
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(memeUploadActions.putTitle(e.target.value));
  };
  const titleState = useSelector<RootState, number>(state => state.memeUpload.titleState)
  // const titleChecked = useSelector<RootState, boolean>(state => state.memeUpload.titleChecked)
  const [titleLoading, setTitleLoading] = useState(false);
  const [titleChecked, setTitleChecked] = useState<boolean | null>(null);

  // 중복검사 Axios
  const { data, status, sendRequest } = useAxios();

  // text keyup 할때 1초 후 중복검사 api
  useEffect(() => {
    // 유해성검사 실패해서 돌아왔는데, input 바뀐 경우 -> -1로 변경
    if (titleState === 0) dispatch(memeUploadActions.setTitleState(-1));

    if (!input) return;
    setTitleLoading(true);
    const identifier = setTimeout(() => {
      // key up 1초 후 중복검사 api
      sendRequest({url: `/api/mpoffice/meme/check/${input}`})
    }, 1000);
    return () => {
      clearTimeout(identifier);
    };
  }, [input]);


  useEffect(() => {
    if (!status || status !== 200) return;
    if (data === "success") setTitleChecked(true);
    else if (data === "fail") setTitleChecked(false);
    setTitleLoading(false);
  }, [status])


  return (
    // 바로 밑줄 css checked 값에 loadnig 추가해야함 
    <div className={`${styles.titleInputContainer}`}>    
      <div className={`${styles.inputContainer} ${((input && !titleChecked) || titleState === 0) && styles.errorBox}`}>
        <input
          className={styles.inputBox}
          value={input}
          onChange={changeHandler}
          placeholder="이미지 밈의 제목 혹은 텍스트 밈을 입력하세요."
        />

        {input && titleLoading && (
          <div className={styles.spinnerContainer}>
            <i className="pi pi-spin pi-spinner" />
          </div>
        )}
      </div>
      
      <div className={`${styles.errorMsg}`}>
        {/* title checked에 대한 loading도 false여야함 -> axios 들어오면 추후 수정 */}
        {input && !titleChecked && <p>중복된 밈입니다.</p>}
        {titleState === 0 && <p>유해성 검사를 통과하지 못했습니다.</p>}
      </div>
    </div>
  );
};

export default MemeTitleInput;
