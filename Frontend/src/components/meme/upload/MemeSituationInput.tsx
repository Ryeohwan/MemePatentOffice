import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { memeUploadActions } from "store/memeUpload";
import { RootState } from "store/configStore";

import styles from "./MemeSituationInput.module.css";

const MemeSituationInput: React.FC = () => {
  const dispatch = useDispatch();

  const input = useSelector<RootState, string>(state => state.memeUpload.situation)
  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(memeUploadActions.putSituation(e.target.value));
  };

  return (
    <div className={styles.situationInputContainer}>
      <div className={styles.inputContainer}>
        <textarea
          className={styles.inputBox}
          value={input}
          onChange={changeHandler}
          placeholder="밈을 사용하는 상황을 입력해주세요."
        />
      </div>
      <p className={styles.explanation}>유해성 검사를 통과하지 못했습니다.</p>
    </div>
  );
};

export default MemeSituationInput;
