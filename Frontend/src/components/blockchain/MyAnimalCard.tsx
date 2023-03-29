import React, { useState } from "react";
import { saleAnimalTokenContract, web3 } from "web3config";
import AnimalCard from "./AnimalCard";

export interface IMyAnimalCard {
  animalTokenId: string;
  animalType: string;
  animalPrice: string;
}

interface MyAnimalCardProps extends IMyAnimalCard {
  saleStatus: boolean;
  account: string;
}

const MyAnimalCard: React.FC<MyAnimalCardProps> = ({
  animalType,
  animalTokenId,
  animalPrice,
  saleStatus,
  account,
}) => {
  const [sellPrice, setSellPrice] = useState<string>("");
  const [myAnimalPrice, setMyAnimalPrice] = useState<string>(animalPrice);

  const onChangeSellPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellPrice(e.target.value);
  };
  const onClickSell = async () => {
    try {
        if (!account || !saleStatus) return;
        const response = await saleAnimalTokenContract.methods.setForSaleAnimalToken(animalTokenId, web3.utils.toWei(sellPrice, 'ether')).send({from: account});
        console.log(response);
        if (response.status) {
            setMyAnimalPrice(web3.utils.toWei(sellPrice, 'ether'));
            
        }
    } catch (e) {
        console.log(e);
    }
  }
  return (
    <div>
      <AnimalCard animalType={animalType} />
      {myAnimalPrice === "0" ? (
        <div>
          <input type="number" value={sellPrice} onChange={onChangeSellPrice} />
          <button onClick={onClickSell}>Sell</button>
        </div>
      ) : (
        <div>{web3.utils.fromWei(myAnimalPrice)} Matic</div>
      )}
    </div>
  );
};

export default MyAnimalCard;
