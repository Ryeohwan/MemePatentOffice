import BlockChainPage from "blockchain/blockchain-middler/BlockChainPage";
import React, { useState, useEffect } from "react";
import useAxios from "hooks/useAxios";
import { checkMyBalance, giveSignInCoin } from "web3config";


const BlockChain: React.FC = () => {
  // const account = sessionStorage.user
  //   ? JSON.parse(sessionStorage.user).walletAddress
  //   : null;
  // const { sendRequest } = useAxios();

  // const postNull = () => {
  //   if (account) {
  //     sendRequest({
  //       url: "/api/mpoffice/user/update/wallet",
  //       method: "POST",
  //       data: {
  //         userId: 530,
  //         walletAddress: null,
  //       },
  //     });
  //     const user = JSON.parse(sessionStorage.getItem("user")!);
  //     user.walletAddress = null;
  //     sessionStorage.setItem("user", JSON.stringify(user));
  //   }
  // };
  
  // useEffect(()=> {
  //   checkMyBalance();
  // },[])
  
  return (
    <div>
      {/* <BlockChainPage account={account} />
      <button onClick={postNull}> null로</button> */}
      환영해
    </div>
  );
};

export default BlockChain;
