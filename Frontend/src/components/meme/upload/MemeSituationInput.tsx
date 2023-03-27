import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { memeUploadActions } from "store/memeUpload";
import { RootState } from "store/configStore";

import styles from "./MemeSituationInput.module.css";

const MemeSituationInput: React.FC = () => {
  const dispatch = useDispatch();

  const input = useSelector<RootState, string>(
    (state) => state.memeUpload.situation
  );
  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(memeUploadActions.putSituation(e.target.value));
    // 유해성검사 실패해서 돌아왔는데, input 바뀐 경우 -> true로 변경
    if (!situationState) dispatch(memeUploadActions.setSituationState(true));
  };

  const situationState = useSelector<RootState, boolean>(
    (state) => state.memeUpload.situationState
  );

  return (
    <div className={styles.situationInputContainer}>
      <div className={`${styles.inputContainer} ${!situationState && styles.errorBox}`}>
        <textarea
          className={styles.inputBox}
          value={input}
          onChange={changeHandler}
          placeholder="밈을 사용하는 상황을 입력해주세요."
        />
      </div>
      <div className={styles.errorMsg}>
        {!situationState && <p>유해성 검사를 통과하지 못했습니다.</p>}
      </div>
    </div>
  );
};

export default MemeSituationInput;
