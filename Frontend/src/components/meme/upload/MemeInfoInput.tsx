import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { memeUploadActions } from "store/memeUpload";
import { RootState } from "store/configStore";

import styles from "./MemeInfoInput.module.css";

const MemeInfoInput: React.FC = () => {
  const dispatch = useDispatch();

  const input = useSelector<RootState, string>(
    (state) => state.memeUpload.info
  );
  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(memeUploadActions.putInfo(e.target.value));
    // 유해성검사 실패해서 돌아왔는데, input 바뀐 경우 -> true로 변경
    if (!infoState) dispatch(memeUploadActions.setInfoState(true));
  };
  
  const infoState = useSelector<RootState, boolean>(
    (state) => state.memeUpload.infoState
  );

  return (
    <div className={styles.infoInputContainer}>
      <div className={`${styles.inputContainer} ${!infoState && styles.errorBox}`}>
        <textarea
          className={styles.inputBox}
          value={input}
          onChange={changeHandler}
          placeholder="밈에 대한 뜻을 입력해주세요."
        />
      </div>
      <div className={styles.errorMsg}>
        {!infoState && <p>유해성 검사를 통과하지 못했습니다.</p>}
      </div>
    </div>
  );
};

export default MemeInfoInput;
