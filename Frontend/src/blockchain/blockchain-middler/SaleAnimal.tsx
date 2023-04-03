import Layout from "blockchain/blockchain-components/Layout";
import { IMyAnimalCard } from "blockchain/blockchain-components/MyAnimalCard";
import SaleAnimalCard from "blockchain/blockchain-components/SaleAnimalCard";
import React, { useState, useEffect } from "react";
import { mintMemeTokenContract, saleMemeTokenContract } from "web3config";

interface SaleAnimalProps {
  account: string;
}

const SaleAnimal: React.FC<SaleAnimalProps> = ({ account }) => {
  const [saleMemeCardArray, setSaleMemeCardArray] =
    useState<IMyAnimalCard[]>();

  const getOnSaleAnimalTokens = async () => {
    try {
      const onSaleAnimalTokenArrayLength = await saleMemeTokenContract.methods
        .getOnSaleAnimalTokenArrayLength()
        .call();
      let tempOnSaleArray: IMyAnimalCard[] = [];

      for (let i = 0; i < parseInt(onSaleAnimalTokenArrayLength, 10); i++) {
        const animalTokenId = await saleMemeTokenContract.methods
          .onSaleAnimalTokenArray(i)
          .call();

        const animalType = await mintMemeTokenContract.methods
          .animalTypes(animalTokenId)
          .call();

        const animalPrice = await saleMemeTokenContract.methods
          .animalTokenPrices(animalTokenId)
          .call();

        tempOnSaleArray.push({ animalTokenId, animalType, animalPrice });
      }

      setSaleMemeCardArray(tempOnSaleArray);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOnSaleAnimalTokens();
  }, []);

  useEffect(() => {
    console.log(saleMemeCardArray);
  }, [saleMemeCardArray]);

  return (
    <div>
      <Layout />
      {saleMemeCardArray &&
        saleMemeCardArray.map((v, i) => {
          return (
            <SaleAnimalCard
              key={i}
              animalType={v.animalType}
              animalPrice={v.animalPrice}
              animalTokenId={v.animalTokenId}
              account={account}
              getOnSaleAnimalTokens={getOnSaleAnimalTokens}
            />
          );
        })}
    </div>
  );
};

export default SaleAnimal;
