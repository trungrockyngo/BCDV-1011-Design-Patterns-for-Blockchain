// SPDX-License-Identifier: MIT
pragma solidity ^0.7.1;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC721Token.sol";

contract ArtWork {
    struct Art {
        address artist;
        string name;
        uint hashIPFS;
    }
    address owner;

    
    constructor(uint ipfsHash, string memory name_) {
        Art memory _art = Art({
            artist: msg.sender, 
            name: name_,
            hashIPFS: ipfsHash
        });
    
        owner = _art.artist;
    }
 
    function setOwner(address newOwner) public {
        if(owner == msg.sender) {
            owner = newOwner;
        }
    }
}

contract NFTArt is ERC721Token {
    mapping (uint => ArtWork) private artworks;
    address private artist;

    constructor(address _proxyRegistryAddress)
        ERC721Token("GBCArt Token", "GBC", _proxyRegistryAddress){}

    function baseTokenURI() public pure override returns (string memory) {
        return "https://opensea-creatures-api.herokuapp.com/api/creature/";
    }

     function createArtwork(uint hashIPFS, string memory Name) public returns (ArtWork) {
        ArtWork artContract = new ArtWork(hashIPFS, Name);
        artworks[hashIPFS] = artContract;
        return artContract;
    }

    function checkArtwork(uint hashIPFS) public view returns(bool) {
        // ArtWork expectedOriginal = ArtWork(0x0, "expectedOriginal");
        
        if(artworks[hashIPFS] == ArtWork(address(0x00))) {
            return true;
        }
        return false;
    }
}
