
import './App.css';
import '../contracts/abi';


function App() {


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
    <div className="main">
      
    </div>
  );
}

export default App;
