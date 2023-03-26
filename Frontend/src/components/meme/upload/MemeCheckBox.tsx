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
        <p>경매를 등록한 이후에는 수정 및 취소가 불가합니다.</p>
        <div>
          <span>이에 동의 하십니까?</span>
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
