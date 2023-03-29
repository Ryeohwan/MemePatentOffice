import MyAnimal from "contracts/MyAnimal";
import React, { useState, useEffect } from "react";

const Animals:React.FC = () => {
    const [account, setAccount] = useState("");

    const getAccount = async () => {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]);
        } else {
          alert("Install Metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getAccount();
    }, []);
  
    useEffect(() => {
      console.log(account);
    }, [account]);

    return (
        <div>
            <MyAnimal account={account}/>
        </div>
    );
};

export default Animals;