import SaleAnimal from "blockchain/blockchain-middler/SaleAnimal";
import React, { useState, useEffect } from "react";

const Sales: React.FC = () => {
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

  return (
    <div>
      <SaleAnimal account={account} />
    </div>
  );
};

export default Sales;
