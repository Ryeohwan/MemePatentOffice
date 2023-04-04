import BlockChainPage from "blockchain/blockchain-middler/BlockChainPage";
import React, { useState, useEffect } from "react";
import { memeOwnerAccess, saleOwnerAccess } from "web3config";

const BlockChain: React.FC = () => {
  const [account, setAccount] = useState("");
  const userAccount = sessionStorage.getItem("account");
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
    memeOwnerAccess().then((tokenId) => {
      console.log("Token ID:", tokenId);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    console.log(account);
  }, [account]);

  return (
    <div>
      <BlockChainPage account={account} />
    </div>
  );
};

export default BlockChain;
