import BlockChainPage from "blockchain/blockchain-middler/BlockChainPage";
import { get } from "http";
import React, { useState, useEffect } from "react";
import { giveSignInCoin, memeOwnerAccess, transferNftCoin, transferNftOwnership } from "web3config";

const BlockChain: React.FC = () => {
  const [account, setAccount] = useState("");
  const userAccount = sessionStorage.getItem("account");
  // const walletAddress = JSON.parse(sessionStorage.user).walletAddress;
  const walletAddress = JSON.parse(sessionStorage.getItem('user')!).walletAddress
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
    console.log(walletAddress)
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
