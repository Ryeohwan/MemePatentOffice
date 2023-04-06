import BlockChainPage from "blockchain/blockchain-middler/BlockChainPage";
import React, { useEffect } from "react";
import useAxios from "hooks/useAxios";
import { checkMyBalance, giveSignInCoin, transferNftCoin, transferNftOwnership } from "web3config";


const BlockChain: React.FC = () => {
  const account = sessionStorage.user
    ? JSON.parse(sessionStorage.user).walletAddress
    : null;
  const { sendRequest } = useAxios();

  const postNull = () => {
    if (account) {
      sendRequest({
        url: "/api/mpoffice/user/update/wallet",
        method: "POST",
        data: {
          userId: 530,
          walletAddress: null,
        },
      });
      const user = JSON.parse(sessionStorage.getItem("user")!);
      user.walletAddress = null;
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  };

  const fromAccount = "0x062294073b003EEB03eBA75B668c54C290F8730a";   // 판
  const toAccount = "0xFE9bf05034D04EE9bAfb5c9ef3BD4b6EF33959bd"; // 구
  const price = 1;
  const memeTokenId = 15;
  
  const onClickTransfer = async () => {
    await transferNftCoin(toAccount, fromAccount, price);
    // await transferNftOwnership(toAccount, memeTokenId);
    
  };

  // useEffect(() => {
  //   checkMyBalance();
  // }, [])

  return (
    <div>
      내 블록체인 페이지에 온 걸 환영해
      <BlockChainPage account={account} />
      <button onClick={postNull}> null로</button>
      <button onClick={onClickTransfer}>제발제발제발제발제발</button>
    </div>
  );
};

export default BlockChain;
