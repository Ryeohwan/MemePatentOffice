import React, { useEffect, useState } from "react";

import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import { Sidebar } from "primereact/sidebar";
import styles from "components/auction/main/list/Bidding.module.css";
import { Button } from "primereact/button";
import { checkMyBalance } from "web3config";
import { useNavigate } from "react-router-dom";

interface BiddingProps {
  biddingVisible: boolean;
  biddingHandler: (state:boolean) => void;
  biddingSubmitHandler: (price:number) => void;
  myBalance: React.MutableRefObject<number|undefined>
}

const Bidding: React.FC<BiddingProps> = ({
  biddingHandler,
  biddingVisible,
  biddingSubmitHandler,
  myBalance,
}) => {
  const [inputValue, setInputValue] = useState<number>(0);
  const inputHandler = (e: InputNumberChangeEvent) => {
    if (e.value) setInputValue(e.value);
  };
  const navigate = useNavigate()
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const checkBalance = async () => {
    const account = JSON.parse(sessionStorage.getItem("user")!).walletAddress;
    try {
      if (!account){
        myBalance.current = -1
        return
      };
      await checkMyBalance()
        .then((balance) => {
          myBalance.current = balance/(10**18);
        })
        .catch((error) => {
        });
      return myBalance.current;
    } catch (e) {
      myBalance.current = 0;
      return false;
    }
  };
  
  const seeBalance = async () => {
    await checkBalance();
  }
  useEffect(()=>{
    seeBalance()
  },[])
  return (
    <Sidebar
      appendTo={document.getElementById("auction")}
      className={styles.sideBar}
      visible={biddingVisible}
      position="bottom"
      onHide={() => biddingHandler(false)}
    >
      <form
        className={styles.inputWraper}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitHandler(e)}
      >
        <InputNumber
          className={styles.input}
          placeholder="SSF"
          onChange={inputHandler}
        />
        <Button label="입찰" onClick={() => biddingSubmitHandler(inputValue)} />
      </form>
      <p className={styles.mySSF}>보유 SSF: {myBalance.current!} SSF </p>
    </Sidebar>
  );
};

export default Bidding;
