const NFTArt = artifacts.require('./contracts/NFTArt.sol');

module.exports = (deployer, network) => {
    let proxyRegistryAddr = ""; 
    if (network === "rinkeby") {
        proxyRegistryAddress = "0xf57b2c51ded3a29e6891aba85459d600256cf317"; //this has to be contract address on Etherscan using rinkeby
    }
    else {
        proxyRegistryAddress = "0xa5409ec958c83c3f309868babaca7c86dcb077c1"; //otherwise, using the one on mainnet
    }
}