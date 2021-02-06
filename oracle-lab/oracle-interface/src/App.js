import Web3 from 'web3';

function App() {
	let defaultURL = "http://127.0.0.1:8545";
	let contractAddress = '0x47DeaB51CdB854e14c80097B3F657f5a73cFE2f0';
	//let ownerAddress = "0x940AabB2f41bd20Ab7048e04EFB3638af3497b8d";
	let ownerAddress = "0x880B483C1b175145D9FeC7A08D33e3E608620E27";
	let abi = [
		{
			"inputs": [
				{
					"internalType": "bytes4",
					"name": "symbol",
					"type": "bytes4"
				},
				{
					"internalType": "uint256",
					"name": "price",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "volume",
					"type": "uint256"
				}
			],
			"name": "setStock",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"inputs": [
				{
					"internalType": "bytes4",
					"name": "symbol",
					"type": "bytes4"
				}
			],
			"name": "getStockPrice",
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
					"internalType": "bytes4",
					"name": "symbol",
					"type": "bytes4"
				}
			],
			"name": "getStockVolume",
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


	async function clickHandler(e) {
		e.preventDefault();

		//set up web3 providers 
		let web3 = new Web3(new Web3.providers.HttpProvider(defaultURL));
		web3.eth.getAccounts((error, accounts) => {
			console.log(error, accounts);
		});

		let result = await fetch("http://localhost:8000/");
		
		let json = await result.json();
		console.log(`Price: ${json.price}`);
		console.log(`Price: ${json.volume}`);


		//testing based on mock symbol 0x41424345 (not 0x4142434445)
		let contractInstance = new web3.eth.Contract(abi, contractAddress);
		let testSymbol = "0x41424345";
		contractInstance.methods.setStock(testSymbol, 2000, 10)
			.send({ from: ownerAddress }).then(
				val => console.log('Stock price: ', val)
			);

		contractInstance.methods.getStockPrice(testSymbol)
			.call({ from: ownerAddress }).then(
				val => console.log('Stock price: ', val)
			);
		contractInstance.methods.getStockVolume(testSymbol)
			.call({ from: ownerAddress }).then(
				val => console.log('Stock price: ', val)
			);
	}

	return (

		<div className="value">
			<button onClick={clickHandler}> Click me! </button>
		</div>
	);
}

export default App;
