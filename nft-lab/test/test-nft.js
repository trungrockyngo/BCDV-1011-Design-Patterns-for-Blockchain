const BN = require('bignumber.js');
const { assert } = require('console');
const truffleAssert = require('truffle-assertions');
const NFTArt = artifacts.require('../NFTArt'); 

contract('NFTArt', accounts => {

    describe('Initial deployment', () => {

        it('should deploy & assert a truthy instance', async () => {
            const instance = await NFTArt.deployed(); 
            assert.isTrue(instance ? true : false);
        });

        it('should name()', async () => {
            const instance = await NFTArt.deployed(); 

            const expectedName = "GBCArt Token";
            const name = await instance.name.call({from: accounts[0]});
            assert.equal(name, expectedName, `name ${name} is not expected as ${expectedName}`)
        })

        it('should symbol()', async () => {
            const instance = await NFTArt.deployed(); 

            const expectedSymb = "GBC";
            const symb = await instance.symbol.call({from: accounts[0]});
            assert.equal(symb, expectedSymb, `symbol ${symb} is not expected as ${expectedSymb}`)
        })
    })

    describe('Functionalities', () => {

        it('shoould baseTokenURI()', async () => {
            const instance =  await NFTArt.deployed();
            const expectedBaseURI = "https://opensea-creatures-api.herokuapp.com/api/creature/";
            const URI = await instance.baseURI.call({ from: account[0] });
            assert.equal(URI, expectedBaseURI, `URI ${URI} is not expected as ${expectedBaseURI}`)
        })

        it(`should check artwork's originality by checkArtwork() after createArtwork()`, async () => {
            const instance =  await NFTArt.deployed();
            
            const ipfshash = 1, name = "Some kind of artwork"; 

            const artWork = await instance.createArtwork( ipfshash, name).call({ from: accounts[0]});

            let checkArtWork = await instance.checkArtwork(1); 
            assert.equal(checkArtWork, false, `artwork of ipfs hash ${ipfshash} is expected to non original`);
        }) 
    })

})