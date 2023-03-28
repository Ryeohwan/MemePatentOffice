import { mintAnimalTokenContract } from "web3config";
import React, { useState } from "react";
import AnimalCard from "components/blockchain/AnimalCard";

interface AccountProps {
  account: string;
}

const BlockChainPage: React.FC<AccountProps> = ({ account }) => {
  const [newAnimalType, setNewAnimalType] = useState("");

  const onClickMint = async () => {
    try {
      if (!account) return;
      const response = await mintAnimalTokenContract.methods
        .mintAnimalToken()
        .send({ from: account });
        
        if (response.status) {
          const balanceLength = await mintAnimalTokenContract.methods.balanceOf(account).call();
          const animalType = await mintAnimalTokenContract.methods.animalTypes(animalTokenId).call();
          setNewAnimalType(animalType);
        }

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
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
