import React, { useState } from "react";

import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import { Sidebar } from "primereact/sidebar";
import styles from "components/auction/main/list/Bidding.module.css";
import { Button } from "primereact/button";
import { FormEvent } from "primereact/ts-helpers";

interface BiddingProps {
  biddingVisible: boolean;
  biddingHandler: () => void;
  biddingSubmitHandler: () => void;
}

const Bidding: React.FC<BiddingProps> = ({
  biddingHandler,
  biddingVisible,
  biddingSubmitHandler,
}) => {
  const [inputValue, setInputValue] = useState<number>(0);
  const inputHandler = (e: InputNumberChangeEvent) => {
    if (e.value) setInputValue(e.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <Sidebar
      className={styles.sideBar}
      visible={biddingVisible}
      position="bottom"
      onHide={() => biddingHandler()}
    >
      <form className={styles.inputWraper} onSubmit={(e:React.FormEvent<HTMLFormElement>) => submitHandler(e)}>
          <InputNumber
            className={styles.input}
            placeholder="SSF"
            onChange={inputHandler}
          />
        <Button label="입찰" onClick={()=>biddingSubmitHandler()}/>
      </form>
      <p className={styles.mySSF}>보유 SSF: 124 SSF </p>
    </Sidebar>
  );
};

export default Bidding;
