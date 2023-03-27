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
        <p>뭐라쓰지,,, 저작권 뭐 어쩌구 이런거.,,, 수정 못한다,,,,</p>
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
