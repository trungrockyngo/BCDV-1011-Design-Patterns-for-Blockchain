import {ipfsService} from './ipfs/ipfs';
// import Web3 from 'web3'; 
// import File from 'fs-extra';

function App() {
  async function uploadFileHandler(e){
    e.preventDefault();
    //console.log("uploadFileHandler clicked!")
    console.log(ipfsService.uploadFiles()); 
  }

  return (
    <div className="App">
     <button onClick={uploadFileHandler}> Upload File to IPFS </button>
    </div>
  );
}

export default App;
