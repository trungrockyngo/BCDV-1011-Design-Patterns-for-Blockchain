// import '../contracts/reources';
const resource = require('../contracts/reources');

var Web3 = require('web3');
var etherTx = require('ethereumjs-tx');

var express = require('express');
const app = new express();
// var router = express.Router();

const init = () => {
  let txObj = etherTx.Transaction;
  let web3 = new Web3(new Web3.providers.HttpProvider(resource.defaultURL));
  web3.eth.getAccounts(console.log);
  
  let contractInstance = new web3.eth.Contract(resource.abi, resource.contractAddr);
  console.log(`contractInstance: ${contractInstance}`);
  
  const encodedABI = contractInstance.methods.set(10).encodeABI();
  console.log(data);

  let rawTX = {}; 
  
  // let  = await web3.eth.getTransactionCount(); 
  web3.eth.getTransactionCount().then( nonce => {
    rawTX = {
      nonce: nonce, 
      getPrice: '0x20000000000', 
      gasLimit: '0x41409',
      to: contractAddr, 
      value: 0, 
      data: encodedABI
    }

    let tx = new txObj(rawTX); 
    tx.sign(resource.privateKey);
    
    let serializedTx = tx.serialize();
    
    //NOTE: sendSignedTransaction() returns eventEmiter binded to receipt  
    web3.Eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);
    }
  )
}

/* GET home page. */
app.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  init();
});

module.exports = app;
