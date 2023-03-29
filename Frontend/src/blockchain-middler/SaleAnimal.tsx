import Layout from "blockchain-components/Layout";
import { IMyAnimalCard } from "blockchain-components/MyAnimalCard";
import SaleAnimalCard from "blockchain-components/SaleAnimalCard";
import saleAnimalCard from "blockchain-components/SaleAnimalCard";
import React, {useState, useEffect} from "react";
import { AnimationLoader } from "three";
import { mintAnimalTokenContract, saleAnimalTokenContract } from "web3config";

interface SaleAnimalProps {
    account: string;
};

const SaleAnimal:React.FC<SaleAnimalProps> = ({ account }) => {
    const [saleAnimalCardArray, setsaleAnimalCardArray] = useState<IMyAnimalCard[]>();

    const getOnSaleAnimalTokens = async () => {
        try {
            const onSaleAnimalTokenArrayLength = await saleAnimalTokenContract.methods.getOnSaleAnimalTokenArrayLength().call();
            let tempOnSaleArray:IMyAnimalCard[] = [];

            for (let i=0; i<parseInt(onSaleAnimalTokenArrayLength, 10); i++) {
                const animalTokenId = await saleAnimalTokenContract.methods.onSaleAnimalTokenArray(i).call();

                const animalType = await mintAnimalTokenContract.methods.animalTypes(animalTokenId).call();

                const animalPrice = await saleAnimalTokenContract.methods.animalTokenPrices(animalTokenId).call();

                tempOnSaleArray.push({ animalTokenId, animalType, animalPrice });
            }

            setsaleAnimalCardArray(tempOnSaleArray);

        } catch (e) {
            console.log(e);
        };;
    };

    useEffect(() => {
        getOnSaleAnimalTokens();
    }, []);

    useEffect(() => {
        console.log(saleAnimalCardArray);
    }, [saleAnimalCardArray]);

    return (
        <div>
            <Layout/>
            {saleAnimalCardArray && saleAnimalCardArray.map((v, i) => {
                return <SaleAnimalCard key={i} animalType={v.animalType} animalPrice={v.animalPrice} animalTokenId={v.animalTokenId} account={account} getOnSaleAnimalTokens={getOnSaleAnimalTokens}/>;
            })}
        </div>
    );
};

export default SaleAnimal;