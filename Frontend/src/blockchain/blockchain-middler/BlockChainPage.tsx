import { mintMemeTokenContract } from "web3config";
import React, { useState } from "react";
import AnimalCard from "blockchain/blockchain-components/AnimalCard";
import Layout from "blockchain/blockchain-components/Layout";

interface AccountProps {
  account: string;
}

const BlockChainPage: React.FC<AccountProps> = ({ account }) => {
  const [newAnimalType, setNewAnimalType] = useState("");

  const onClickMint = async () => {
    try {
      if (!account) return;
      const response = await mintMemeTokenContract.methods
        .mintMemeToken()
        .send({ from: account });
      console.log(response);
      if (response.status) {
        const balanceLength = await mintMemeTokenContract.methods
          .balanceOf(account)
          .call();
        const animalTokenId = await mintMemeTokenContract.methods
          .tokenOfOwnerByIndex(account, parseInt(balanceLength.length, 10) - 1)
          .call();
        console.log("token ID ", animalTokenId);
        const animalType = await mintMemeTokenContract.methods
          .animalTypes(animalTokenId)
          .call();
        setNewAnimalType(animalType);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div>
        <Layout />
      </div>
      {newAnimalType ? (
        <AnimalCard animalType={newAnimalType} />
      ) : (
        <div>
          민팅하러 가즈앙
          <button onClick={onClickMint}>mint</button>
        </div>
      )}
    </div>
  );
};

export default BlockChainPage;
