import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { memeUploadActions } from "store/memeUpload";
import { RootState } from "store/configStore";

import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";

import styles from "./MemeCheckBox.module.css";

const MemeCheckBox: React.FC = () => {
  const dispatch = useDispatch();
  const isChecked = useSelector<RootState, boolean>(
    (state) => state.memeUpload.checkbox
  );

  return (
    <>
      <div className={styles.checkboxWrapper}>
        <p>밈을 NFT로 등록하시면, 추후 삭제나 변경이 불가합니다.</p>
        <p>또한, NFT 발행 후 생기는 법적 문제의 책임은 발행자</p>
        <div>
          <span>본인에게 있습니다. 이에 동의하십니까?</span>
          <Checkbox
            className={styles.checkbox}
            onChange={(e: CheckboxChangeEvent) => {
              if (e.checked === true || e.checked === false)
                dispatch(memeUploadActions.toggleCheckBox(e.checked))
            }}
            checked={isChecked}
          />
        </div>
      </div>
    </>
  );
};

export default MemeCheckBox;
