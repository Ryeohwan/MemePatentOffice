import BlockChainPage from "blockchain/blockchain-middler/BlockChainPage";
import { get } from "http";
import React, { useState, useEffect } from "react";
import { giveSignInCoin, memeOwnerAccess, transferNftCoin, transferNftOwnership } from "web3config";

const BlockChain: React.FC = () => {
  const [account, setAccount] = useState("");
  const [ yes, setYes ] = useState(false);
  let accountAddress = "";

  const getUserAccount = () => {
    const user = JSON.parse(sessionStorage.getItem("user")!);
    user.walletAddress = "0xFE9bf05034D04EE9bAfb5c9ef3BD4b6EF33959bd";
    sessionStorage.setItem("user", JSON.stringify(user));
    setYes(true);
  }

  useEffect(() => {
    const userId = JSON.parse(sessionStorage.user).userId;
    console.log("user session", userId);
  }, []);

  useEffect(() => {
    
  }, [yes])


  return (
    <div>
      <BlockChainPage account={account} />
    </div>
  );
};

export default BlockChain;
