const ipfsClient = require('ipfs-http-client');

//NOTE: host as ipfs.infura.io needed to get the successful fetch
//const ipfsHost = new ipfsClient({ host: 'localhost', protocol: 'http', port: 5001 });
const ipfsHost = new ipfsClient({ host: 'ipfs.infura.io', protocol: 'http', port: 5001 });

// module.export = {
//     ipfsHost: ipfsHost 
// };

export default ipfsHost; 