import BlockChainPage from "blockchain/blockchain-middler/BlockChainPage";
import React from "react";
import useAxios from "hooks/useAxios";
import { transferNftCoin, transferNftOwnership } from "web3config";


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
  const fromAccount = "0xb30371Fa4280a9907a04b4b7780F7f1f1C294d1F";
  const toAccount = "0xd8df17B6a1758c52eA81219b001547A2c2e3d789";
  const price = 99;
  const memeTokenId = 6;

  const onClickTransfer = async () => {
    await transferNftCoin(toAccount, fromAccount, price);
    await transferNftOwnership(toAccount, memeTokenId);
  };

  return (
    <div>
      내 블록체인 페이지에 온 걸 환영해 연진아
      <BlockChainPage account={account} />
      <button onClick={postNull}> null로</button>
      <button onClick={onClickTransfer}>제발제발제발제발제발</button>
    </div>
  );
};

export default BlockChain;
