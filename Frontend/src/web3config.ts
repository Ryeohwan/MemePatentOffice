import Web3 from "web3";
import { AbiItem } from "web3-utils";

export const web3 = new Web3(window.ethereum);

export const saleMemeTokenAddress =
  "0x202a46a7605aF24E86ecFEAD7ff59eA28334cd80";
export const mintMemeTokenAddress =
  "0x729c78AE9F9c186Fbac20f7f2BfEAC363150dcea";

const saleMemeTokenAbi: AbiItem[] = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mintCoin",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferCoin",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const mintMemeTokenAbi: AbiItem[] = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "mintMemeToken",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenAddress",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const mintMemeTokenContract = new web3.eth.Contract(
  mintMemeTokenAbi,
  mintMemeTokenAddress
);

export const saleMemeTokenContract = new web3.eth.Contract(
  saleMemeTokenAbi,
  saleMemeTokenAddress
);

////////// MintMemeToken Contracts

// Minting (ok)
export const memeOwnerAccess = async () => {
  const account = JSON.parse(sessionStorage.getItem("user")!).walletAddress;

  const ownerAddress = "0x43951044391Fc4f7770e3B0F3917e070674adA86";
  const privateKey =
    "95b7fe40915bba18c44515b78e7e9853ee63da862f13a1497bf18d3fde816743";

  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 3000000;

  const data = mintMemeTokenContract.methods.mintMemeToken(account).encodeABI();

  const nonce = await web3.eth.getTransactionCount(ownerAddress, "latest");
  const newNonce = nonce + 1;

  const signedTx = await web3.eth.accounts.signTransaction(
    {
      from: ownerAddress,
      to: mintMemeTokenAddress,
      data: data,
      gas: gasLimit,
      gasPrice: gasPrice,
      nonce: newNonce,
    },
    privateKey
  );

  let tokenId;
  if (signedTx.rawTransaction) {
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    const tokenIdHex = receipt.logs[0].topics[3];
    tokenId = parseInt(tokenIdHex, 16);
  } else {
    console.error("Signed transaction is undefined");
  }
  return tokenId;
};

// NFT 소유권 이전 (경매 후)
export const transferNftOwnership = async (
  toAccount: string,
  tokenId: number | undefined
) => {
  const ownerAddress = "0x43951044391Fc4f7770e3B0F3917e070674adA86";
  const privateKey =
    "95b7fe40915bba18c44515b78e7e9853ee63da862f13a1497bf18d3fde816743";

  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 3000000;

  let data;
  data = mintMemeTokenContract.methods
    .transferNFT(toAccount, tokenId)
    .encodeABI();

  const nonce = await web3.eth.getTransactionCount(ownerAddress, "latest");
  const newNonce = nonce + 1;

  const signedTx = await web3.eth.accounts.signTransaction(
    {
      from: ownerAddress,
      to: mintMemeTokenAddress,
      data: data,
      gas: gasLimit,
      gasPrice: gasPrice,
      nonce: newNonce,
    },
    privateKey
  );

  console.log("signedTx", signedTx);
  if (signedTx.rawTransaction) {
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    return true;
  } else {
    return false;
  }
};

////////// SaleMemeToken Contracts

// 회원가입했을 때 코인 주기
export const giveSignInCoin = async (account:string) => {
	console.log(account);
    const price = 500;

	const ownerAddress = "0x43951044391Fc4f7770e3B0F3917e070674adA86";
	const privateKey = "95b7fe40915bba18c44515b78e7e9853ee63da862f13a1497bf18d3fde816743";

	const gasPrice = await web3.eth.getGasPrice()+10;
	console.log(gasPrice)
	const gasLimit = 3000000;
	let data;
	data = saleMemeTokenContract.methods.mintCoin(account, price).encodeABI();

	const latestNonce = await web3.eth.getTransactionCount(ownerAddress, 'latest')
	const newNonce = latestNonce + 1;

	const signedTx = await web3.eth.accounts.signTransaction({
	  from: ownerAddress,
	  to: saleMemeTokenAddress,
	  data: data,
	  gas: gasLimit,
	  gasPrice: gasPrice,
	  nonce: newNonce,
	}, privateKey);
	console.log("signedTx", signedTx);

	if (signedTx.rawTransaction) {
		console.log("singedTx.rawTransaction이 있긴 함")
		try {
			const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
			console.log(receipt)
			return receipt.status;
		} catch (e) {
			console.log(e);
			const newGasPrice = await web3.eth.getGasPrice() + 30;
			const nonce = await web3.eth.getTransactionCount(ownerAddress, "pending");
			const newData = saleMemeTokenContract.methods.mintCoin(account, price).encodeABI();
			const newSignedTx = await web3.eth.accounts.signTransaction({
				from: ownerAddress,
				to: saleMemeTokenAddress,
				data: newData,
				gas: gasLimit,
				gasPrice: newGasPrice,
				nonce: nonce+1,
			}, privateKey);
			console.log(newSignedTx);
			const newReceipt = await web3.eth.sendSignedTransaction(newSignedTx.rawTransaction!);
			console.log(newReceipt);
		}
	};
};

// // 코인 거래 (경매 후)  (판매자 : fromAccount, 구매자 : toAccount)
export const transferNftCoin = async ( toAccount:string, fromAccount:string, price:number) => {

	const ownerAddress = "0x43951044391Fc4f7770e3B0F3917e070674adA86";
	const privateKey = "95b7fe40915bba18c44515b78e7e9853ee63da862f13a1497bf18d3fde816743";

	const gasPrice = await web3.eth.getGasPrice();
	console.log(gasPrice);
    const gasLimit = 3000000;
    console.log("sale");

	let data;
	data = saleMemeTokenContract.methods.transferCoin(toAccount, fromAccount, price).encodeABI();
    const nonce = await web3.eth.getTransactionCount(ownerAddress, 'latest')
	const newNonce = nonce + 1;

    const signedTx = await web3.eth.accounts.signTransaction({
	  chainId: 11155111,
      from: ownerAddress,
      to: saleMemeTokenAddress,
      data: data,
	  gasPrice: gasPrice,
      gas: gasLimit,
      nonce: newNonce,
    }, privateKey);

	console.log("signedTx", signedTx);

	if (signedTx.rawTransaction) {
		console.log("singedTx.rawTransaction이 있긴 함")
		const txHash = signedTx.transactionHash;
		console.log(txHash)
		const newGasPrice = parseInt(gasPrice) * 2;
		const gasLimit = 3000000;
		if (txHash) {
			const tx = await web3.eth.getTransactionReceipt(txHash);
			console.log(tx)
			const newTx = {
				from: ownerAddress,
				to: saleMemeTokenAddress,
				gasPrice: newGasPrice,
				gasLimit: gasLimit,
				nonce: newNonce,
			};
			const signedNewTx = await web3.eth.accounts.signTransaction(newTx, privateKey)
			const newReceipt = await web3.eth.sendSignedTransaction(signedNewTx.rawTransaction!);
			console.log(newReceipt);
		}
	};
};


// 코인 거래 (경매 후)  (판매자 : fromAccount, 구매자 : toAccount)
// export const transferNftCoin = async (
//   toAccount: string,
//   fromAccount: string,
//   price: number
// ) => {
//   const ownerAddress = "0x43951044391Fc4f7770e3B0F3917e070674adA86";
//   const privateKey =
//     "95b7fe40915bba18c44515b78e7e9853ee63da862f13a1497bf18d3fde816743";

//   const gasPrice = (await web3.eth.getGasPrice()) + 10;
//   console.log(gasPrice);
//   const gasLimit = 3000000;
//   console.log("sale");

//   let data;
//   data = saleMemeTokenContract.methods
//     .transferCoin(toAccount, fromAccount, price)
//     .encodeABI();
//   const nonce = await web3.eth.getTransactionCount(ownerAddress, "latest");
//   const newNonce = nonce + 1;

//   const signedTx = await web3.eth.accounts.signTransaction(
//     {
//       chainId: 11155111,
//       from: ownerAddress,
//       to: saleMemeTokenAddress,
//       data: data,
//       gasPrice: gasPrice,
//       gas: gasLimit,
//       nonce: newNonce,
//     },
//     privateKey
//   );

//   console.log("signedTx", signedTx);

//   if (signedTx.rawTransaction) {
//     console.log("singedTx.rawTransaction이 있긴 함");
//     try {
//       const receipt = await web3.eth.sendSignedTransaction(
//         signedTx.rawTransaction
//       );
//       console.log(receipt);
//       return receipt.status;
//     } catch (e) {
//       console.log(e);
//       return false;
//     }
//   }
// };
// 잔액 조회
export const checkMyBalance = async () => {
  const account = JSON.parse(sessionStorage.getItem("user")!).walletAddress;
  const balanceLength = await saleMemeTokenContract.methods
    .balanceOf(account)
    .call();
  return balanceLength;
};
