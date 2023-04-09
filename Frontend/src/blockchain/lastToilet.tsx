import React, { useEffect } from "react";
import { giveSignInCoin, transferNftCoin } from "web3config";

const LastToilet:React.FC = () => {

    const onClickMintCoin = async () => {
        const account = "0xFE9bf05034D04EE9bAfb5c9ef3BD4b6EF33959bd";
        await giveSignInCoin(account);
    };

    const onClickTransferCoin = async () => {
        const fromAccount = "0x062294073b003EEB03eBA75B668c54C290F8730a";
        const toAccount = "0xFE9bf05034D04EE9bAfb5c9ef3BD4b6EF33959bd";
        const price = 1;
        await transferNftCoin(toAccount, fromAccount, price);
    }

    return (
        <div>
            달착륙 마지막 시도..
            <button onClick={onClickMintCoin}>mintCoin</button>
            <button onClick={onClickTransferCoin}>transferNftCoin</button>
        </div>
    );
};

export default LastToilet;