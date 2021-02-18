const ipfsClient = require('ipfs-http-client');
// const express = require('express');
// const fileUpload = require('express-fileupload');
// const cors = require('cors');

const fs = require('fs'); 

// const expressApp = new express();
// expressApp.use(express.static('resource')); //to access files in resources/ 
// expressApp.use(fileUpload());
// expressApp.use(cors());


let contents = fs.readFileSync('./resource');//test to fix error

async function uploadFiles() {
    const ipfsHost = ipfsClient({ host: 'localhost', protocol: 'http', port: 5001 });

    //upload local files (more than just a single file)
    // let data = await fs.readFile(`./resource`); 
    // let fileName = "blockchain-strategy.png"; 
   
    let data = contents.toString();
    
    
    const ipfsLog = ipfsHost.add(data); 
    
    console.log(ipfsLog.CID);

    // return "string"; 
}



// export default ipfsHost; => wrong syntax from the slide 
module.exports.ipfsService = {
    uploadFiles: uploadFiles, 
    retrieveFile: retrieveFile
}