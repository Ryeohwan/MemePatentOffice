import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { auctionUploadActions } from "store/auctionUpload";

import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";

import styles from "components/auction/upload/UploadPrice.module.css";

const UploadPrice: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<number | null>(null);

  useEffect(()=>{
    dispatch(auctionUploadActions.selectPrice(value))
  },[value])
  return (
    <>
      <InputNumber
        value={value}
        onChange={(e: InputNumberChangeEvent) => {
          setValue(e.value);
        }}
        className={styles.inputNum}
        placeholder="SSF"
        suffix=" SSF"
      />
    </>
  );
};

export default UploadPrice;
