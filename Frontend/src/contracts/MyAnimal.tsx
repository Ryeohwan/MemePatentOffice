
import React, {useEffect, useState} from "react";
import { mintAnimalTokenContract } from "web3config";

interface MyAnimalProps {
    account: string;
};

const MyAnimal:React.FC<MyAnimalProps> = ({account}) => {

    const [ animalCardArray, setAnimalCardArray ] = useState<string[]>();

    const getAnimalTokens = async () => {
        try {
            const balanceLength = await mintAnimalTokenContract.methods.balanceOf(account).call();
            const tempAnimalCardArray = [];

            for (let i=0; i<parseInt(balanceLength); i++) {
                const animalTokenId = await mintAnimalTokenContract.methods.tokenOfOwnerByIndex(account, 1).call();
                const animalType = await mintAnimalTokenContract.methods.animalType(animalTokenId).call();
                tempAnimalCardArray.push(animalType);
            }

            setAnimalCardArray(tempAnimalCardArray);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (account) return;
        getAnimalTokens();
    }, [account]);

    useEffect(() => {
        console.log(animalCardArray);
    }, [animalCardArray]);

    return (
        <div>
            mmm
        </div>
    );
};

export default MyAnimal;