import Web3 from "web3";
import { AbiItem } from "web3-utils";

const mintAnimalTokenAbi:AbiItem[] = [
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
		"inputs": [],
		"name": "mintAnimalToken",
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
				"internalType": "address",
				"name": "_saleAnimalToken",
				"type": "address"
			}
		],
		"name": "setSaleAnimalToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "animalTypes",
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
				"internalType": "address",
				"name": "_animalTokenOwner",
				"type": "address"
			}
		],
		"name": "getAnimalTokens",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "animalTokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "animalType",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "animalPrice",
						"type": "uint256"
					}
				],
				"internalType": "struct MintAnimalToken.AnimalTokenData[]",
				"name": "",
				"type": "tuple[]"
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
		"name": "saleAnimalToken",
		"outputs": [
			{
				"internalType": "contract SaleAnimalToken",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
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
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
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
	}
];
const saleAnimalTokenAbi:AbiItem[] = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_mintAnimalTokenAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "animalTokenPrices",
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
				"name": "_animalTokenId",
				"type": "uint256"
			}
		],
		"name": "getAnimalTokenPrice",
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
		"name": "getOnSaleAnimalTokenArrayLength",
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
		"name": "mintAnimalTokenAddress",
		"outputs": [
			{
				"internalType": "contract MintAnimalToken",
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "onSaleAnimalTokenArray",
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
				"name": "_animalTokenId",
				"type": "uint256"
			}
		],
		"name": "purchaseAnimalToken",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_animalTokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "setForSaleAnimalToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

// let web3 = new Web3('wss://eth-sepolia.g.alchemy.com/v2/wMn84GBFPKxhdDb0EALg2UE9yNnJz-lf');
export const mintAnimalTokenAddress = "0xeba9e16a5d4c25ad0fa3282d76b39bb98218f645";
export const saleAnimalTokenAddress = "0xab639593c713cc9f023217353914e5ac2e4fed57";
export const web3 = new Web3(window.ethereum);
// const mintAnimalTokenAddress = "0x8a8b71684093db7Dd2D3b474557687DDD18767C0";
// const saleAnimalTokenAddress = "0x4A8c7C951072Ae130318e0A976420EAEe5e0245a";



export const mintAnimalTokenContract =  new web3.eth.Contract(
	mintAnimalTokenAbi,
	mintAnimalTokenAddress
);

export const saleAnimalTokenContract = new web3.eth.Contract(
	saleAnimalTokenAbi,
	saleAnimalTokenAddress
);



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