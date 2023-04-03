import Web3 from "web3";
import { AbiItem } from "web3-utils";

export const web3 = new Web3(window.ethereum);
export const saleMemeTokenAddress = "0x1EE43b64D9269fDF299f35B5694336262CD6d201";
export const mintMemeTokenAddress = "0xAEDae818d8E1864E8961770484bCb35e0d1df299";

const mintMemeTokenAbi:AbiItem[] = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_tokenAddress",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getApproved",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            }
        ],
        "name": "mintMemeToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "rate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "tokenAddress",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
const saleMemeTokenAbi:AbiItem[] = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "subtractedValue",
                "type": "uint256"
            }
        ],
        "name": "decreaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "addedValue",
                "type": "uint256"
            }
        ],
        "name": "increaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "mintToken",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

export const mintMemeTokenContract =  new web3.eth.Contract(
	mintMemeTokenAbi,
	mintMemeTokenAddress
);
export const saleMemeTokenContract = new web3.eth.Contract(
	saleMemeTokenAbi,
	saleMemeTokenAddress
);

export const memeOwnerAccess = async () => {
	const userAccount = sessionStorage.getItem("account");
	let mixedCaseAddress;
	if (typeof(userAccount) === "string") {
		mixedCaseAddress = web3.utils.toChecksumAddress(userAccount);
	};

	const ownerAddress = "0xd8df17B6a1758c52eA81219b001547A2c2e3d789";
	const privateKey = "0xcd3352d522fb229242472dddc60abc0831ba87db490573616e7cc43f4d179a28";
	
	const gasPrice = await web3.eth.getGasPrice();
	const gasLimit = 3000000;

	let data;
	try {
	  data = mintMemeTokenContract.methods.mintMemeToken(mixedCaseAddress).encodeABI();
	  console.log("성공")
	} catch (err) {
	  console.error('Error encoding ABI:', err);
	  return;
	}
	const nonce = await web3.eth.getTransactionCount(ownerAddress, 'latest');
	
	const signedTx = await web3.eth.accounts.signTransaction({
	  from: ownerAddress,
	  to: mintMemeTokenAddress,
	  data: data,
	  gas: gasLimit,
	  gasPrice: gasPrice,
	  nonce: nonce,
	}, privateKey);

	console.log("signedTx", signedTx)
	if (signedTx.rawTransaction) {
		web3.eth.sendSignedTransaction(signedTx.rawTransaction);
	} else {
		console.error("Signed transaction is undefined");
	  }
};



// const ethereumButton = document.querySelector('.enableEthereumButton');
// const mintButton = document.querySelector('.mintButton');
// const showAccount = document.querySelector('.showAccount');
// const memeImage = document.querySelector('.memeImage');
// const getMemeListButton = document.querySelector('.getMemeListButton');
// const checkSaleStatusButton = document.querySelector('.checkSaleStatusButton');
// const memeList = document.querySelector('.memeList');
// const showStatus = document.querySelector('.showStatus');
// const approveSaleStatusButton = document.querySelector('.approveSaleStatusButton')
// const saleButton = document.querySelector('.saleButton')

// const imageUrl = "https://user-images.githubusercontent.com/103018534/227794701-6fabf47b-0c1d-4402-be22-542ec228dc33.png";
// var userAccount;
// var saleStatus;

// const imageUrlList = [
//     "",
//     "https://user-images.githubusercontent.com/103018534/227798277-ddea4377-a070-475d-ba83-dabc5d3b3973.png",
//     "https://user-images.githubusercontent.com/103018534/227798273-29a66490-7a93-48d9-8f78-d0a817ecff3d.png",
//     "https://user-images.githubusercontent.com/103018534/227798276-99871d15-34a4-4a7f-a93b-dcc54d5f7bdd.png",
//     "https://user-images.githubusercontent.com/103018534/227798274-961d900c-3ddf-44a7-8893-42b94ca11674.png",
//     "https://user-images.githubusercontent.com/103018534/227798275-9cfccffe-60ae-4323-a961-a2452c2e0ca4.png"
// ]

// // memeImage.src = imageUrl;

// // 메타마스크가 설치되어있는 지 확인
// if (typeof window.ethereum !== 'undefined') {
//     console.log('MetaMask is installed!');
// } else {
//     console.log('MetaMask is not installed yet !');
// }

// // addEventListener
// ethereumButton!.addEventListener('click', () => {
//   getAccount();
// });

// mintButton!.addEventListener('click', () => {
//     mint();
// });
// getMemeListButton!.addEventListener('click', () => {
//     getMemeTokens();
// })

// checkSaleStatusButton!.addEventListener('click', () => {
// 	getIsApprovedForAll();
// })
// checkSaleStatusButton!.addEventListener('click', () => {
// 	getIsApprovedForAll();
// })
// approveSaleStatusButton!.addEventListener('click', () => {
// 	setApprovalForAll();
// })
// saleButton!.addEventListener('click', () => {
// 	setPrice();
// })
// // 메타마스크를 활성화 하고 계정을 받아온다
// async function getAccount() {
//   const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
//   const account = accounts[0];
//   showAccount!.innerHTML = account;
//   userAccount = account;
// }

// // NFT 민팅
// async function mint() {

//     const account = userAccount;
//     if(!account) {
//         console.log("계정이 없습니다")
//         return;
//     }

//     // NFT 발급
//     const response = await mintAnimalTokenContract.methods
//     .mintAnimalToken()
//     .send({from: account});
//     console.log(response);

//     if(response.status) {
//         // 사용자가 가지고 있는  NFT총 갯수
//         const balanceLength = await mintAnimalTokenContract.methods
//         .balanceOf(account)
//         .call();

//         // 가장 최근에 받은 NFT의 ID
//         const animalTokenId = await mintAnimalTokenContract.methods
//         .tokenOfOwnerByIndex(account, parseInt(balanceLength.length, 10) - 1)
//         .call();

//         // Id를 입력했을때 주는 토큰의 Type -> URL 연동을 위해 필요하다 ( 1 ~ 5 번 예시상 설정)
//         const animalType = await mintAnimalTokenContract.methods
//         .animalTypes(animalTokenId)
//         .call();

//         // NFT를 발급받은 이미지를 화면에 띄운다
//         memeImage!.src = imageUrlList[animalType];

//         console.log({
//             "balanceLength" : balanceLength,
//             "animalTokenId" : animalTokenId, 
//             "animalType" : animalType
//         });
//     }
// }

// //  사용자가 소유하고 있는 모든 토큰을 출력한다
// async function getMemeTokens() {
//     const account = userAccount;
// 	if(!account) {
//         console.log("계정이 없습니다")
//         return;
//     }


// 	// 사용자가 가지고 있는  NFT총 갯수
// 	const balanceLength = await mintAnimalTokenContract.methods
// 	.balanceOf(account)
// 	.call();

// 	for(let i = 0; i < parseInt(balanceLength, 10); i++) {

// 		const animalTokenId = await mintAnimalTokenContract.methods
//         .tokenOfOwnerByIndex(account, i)
//         .call();
// 		const animalType = await mintAnimalTokenContract.methods
//         .animalTypes(animalTokenId)
//         .call();


// 		// 리스트에 이미지 넣기
// 		const li = document.createElement("li");
// 		const img = document.createElement("img");
// 		const p = document.createElement("p");
// 		img.setAttribute('src', imageUrlList[parseInt(animalType)]);
// 		img.setAttribute('width', "15%");
// 		p.textContent = "animalTokenId : " + animalTokenId;

// 		li.appendChild(img);
// 		li.appendChild(p);
// 		li.setAttribute('style', 'float: left');
// 		memeList.appendChild(li);
// 	}
// }
// ///////////////// 판매승인버튼을 만들어서 승인 됐을때만 판매할 수 있도록 한다
// // 판매상태를 가져오는 함수
// // 블록체인 네트워크에게 판매 권한을 준다??
// async function getIsApprovedForAll() {
// 	const account = userAccount;
// 	const response = await mintAnimalTokenContract.methods
// 	.isApprovedForAll(account, saleAnimalTokenAddress) // owner, operator (판매계약서)
// 	.call();

// 	showStatus!.innerHTML = response;
// 	saleStatus = response;
// 	console.log(response)
// }

// // 판매상태를 설정/변경하는 함수 ( 승인 / 취소 )
// async function setApprovalForAll() {
// 	const account = userAccount;
// 	const response = await mintAnimalTokenContract.methods
// 	.setApprovalForAll(saleAnimalTokenAddress, !saleStatus)
// 	.send({from : account});

// 	response = await mintAnimalTokenContract.methods
// 	.isApprovedForAll(account, saleAnimalTokenAddress) // owner, operator (판매계약서)
// 	.call();

// 	showStatus!.innerHTML = response;
// 	saleStatus = response;
// 	console.log(response)

// }

// // 4번 NFT에 판매 가격 설정
// async function setPrice() {
// 	const account = userAccount;
// 	const sellPrice = document.getElementById('price')!.value;
// 	document.getElementById("result")!.innerText = web3.utils.fromWei(sellPrice);

// 	if(!account) {
//         console.log("계정이 없습니다")
//         return;
//     }

// 	if(!saleStatus) {
//         console.log("판매승인이 아직 완료되지 않았습니다")
//         return;
//     }

// 	const response = await saleAnimalTokenContract.methods
// 	.setForSaleAnimalToken(4, web3.utils.toWei(price, "ether"))
// 	.send({from: account});
// 	// 등록할때는 send 조회는 call

// 	if(response) {
// 		console.log(response)
// 	}

	
// }