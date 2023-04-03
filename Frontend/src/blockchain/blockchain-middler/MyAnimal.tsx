import Layout from "blockchain/blockchain-components/Layout";
import MyAnimalCard from "blockchain/blockchain-components/MyAnimalCard";
import { IMyAnimalCard } from "blockchain/blockchain-components/MyAnimalCard";
import React, { useEffect, useState } from "react";
import { mintMemeTokenContract, saleMemeTokenAddress } from "web3config";

interface MyAnimalProps {
  account: string;
}

const MyAnimal: React.FC<MyAnimalProps> = ({ account }) => {
  const [animalCardArray, setAnimalCardArray] = useState<IMyAnimalCard[]>();
  const [saleStatus, setSaleStatus] = useState(false);

  const getAnimalTokens = async () => {
    try {
      const balanceLength = await mintMemeTokenContract.methods
        .balanceOf(account)
        .call();
      let tempAnimalCardArray: IMyAnimalCard[] = [];
      if (balanceLength === "0") return;
      const response = await mintMemeTokenContract.methods
        .getAnimalTokens(account)
        .call();
      console.log("response ", response);
      response.map((v: IMyAnimalCard) => {
        tempAnimalCardArray.push({
          animalTokenId: v.animalTokenId,
          animalType: v.animalType,
          animalPrice: v.animalPrice,
        });
      });
      console.log("tempAnimalCardArray ", tempAnimalCardArray);
      setAnimalCardArray(tempAnimalCardArray);
    } catch (e) {
      console.log(e);
    }
  };

  // 판매상태 승인, 취소
  const getIsApprovedForAll = async () => {
    try {
      const response = await mintMemeTokenContract.methods
        .isApprovedForAll(account, saleMemeTokenAddress)
        .call();
      // console.log(response)            // 초기 : false
      if (response) {
        setSaleStatus(response);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onClickApproveToggle = async () => {
    try {
      if (!account) return;
      const response = await mintMemeTokenContract.methods
        .setApprovalForAll(saleMemeTokenAddress, !saleStatus)
        .send({ from: account });
      if (response.status) {
        setSaleStatus(!saleStatus);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!account) return;
    getIsApprovedForAll();
    getAnimalTokens();
  }, [account]);

  useEffect(() => {
    console.log(animalCardArray);
  }, []);

  return (
    <div>
      <Layout />
      {animalCardArray &&
        animalCardArray.map((v, i) => {
          return (
            <MyAnimalCard
              key={i}
              animalType={v.animalType}
              animalTokenId={v.animalTokenId}
              animalPrice={v.animalPrice}
              saleStatus={saleStatus}
              account={account}
            />
          );
        })}
      <h1>Sale Status : {saleStatus ? "True" : "False"}</h1>
      <button onClick={onClickApproveToggle}>
        {saleStatus ? "Cancel" : "Approve"}
      </button>
    </div>
  );
};

export default MyAnimal;
