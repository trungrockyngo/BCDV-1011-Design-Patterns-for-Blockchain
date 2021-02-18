const defaultURL = "http://localhost:7545";
const contractAddr = "0x88939Cf30022908f5B9a850AF52a4fBD8BABBDAD";
const privateKey = Buffer.from("0x6bbF217e50CA029CEcA3a0A866098845f7D6DBe8", 'hex');

const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "retrieve",
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
]

module.exports = {
	defaultURL: defaultURL, 
	contractAddr: contractAddr, 
	privateKey: privateKey, 
	abi: abi
}