import React, { useEffect, useState } from "react";
import { mintAnimalTokenContract, saleAnimalTokenAddress, saleAnimalTokenContract, web3 } from "web3config";
import AnimalCard from "./AnimalCard";

interface SaleAnimalCardProps {
    animalType: string;
    animalPrice: string;
    animalTokenId: string;
    account: string;
    getOnSaleAnimalTokens: () => Promise<void>        // async 함수여서 Promise
};
const SaleAnimalCard:React.FC<SaleAnimalCardProps> = ({ animalType, animalPrice, animalTokenId, account, getOnSaleAnimalTokens }) => {
    const [ isBuyable, setIsBuyable ] = useState<boolean>(false);
    const getAnimalTokenOwner = async () => {
        try {
            const response = await mintAnimalTokenContract.methods.ownerOf(animalTokenId).call();
            console.log(response);
            console.log(account);
            
            setIsBuyable(
                response.toLocaleLowerCase() === account.toLocaleLowerCase()
            );

        } catch (e) {
            console.log(e);
        };
    };
    const onClickBuy = async() => {
        try {
            const response = await saleAnimalTokenContract.methods.purchaseAnimalToken(animalTokenId).send({from: account, value: animalPrice});
            if (response.status) {
                getOnSaleAnimalTokens();
            }
        } catch (e) {
            console.log(e);
        };
    }
    useEffect(() => {
        getAnimalTokenOwner();
    }, []);


    return (
        <div>
            <AnimalCard animalType={animalType} />
            <div>
                {web3.utils.fromWei(animalPrice)} Matic
            </div>
            {!isBuyable && <button onClick={onClickBuy}>Buy</button>}
            
        </div>
    );
};

export default SaleAnimalCard;