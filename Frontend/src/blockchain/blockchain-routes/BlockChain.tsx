import BlockChainPage from "blockchain/blockchain-middler/BlockChainPage";
import React, { useState, useEffect } from "react";
import { checkMyBalance } from "web3config";

const BlockChain: React.FC = () => {
  const [account, setAccount] = useState("");

  useEffect(() => {
    const balance = checkMyBalance();
    console.log(balance.then((b) => b))
  }, []);

  return (
    <div>
      <BlockChainPage account={account} />
    </div>
  );
};

export default BlockChain;
