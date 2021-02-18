// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/math/SafeMath.sol';
import '@openzeppelin/contracts/utils/Strings.sol';

contract OwnableDelegateProxy { }

contract ProxyRegistry {
    mapping(address => OwnableDelegateProxy) public proxies;
}

contract ERC721Token is ERC721, Ownable {
  using Strings for string;

  address proxyRegistryAddress;
  uint256 private _currentTokenId = 0;

  constructor(string memory _name, string memory _symbol, address _proxyRegistryAddress) ERC721(_name, _symbol) {
    proxyRegistryAddress = _proxyRegistryAddress;
  }

  /**
    * @dev Mints a token to an address with a tokenURI.
    * @param _to address of the future owner of the token
    */
  function mintTo(address _to) public onlyOwner {
    uint256 newTokenId = _getNextTokenId();
    _safeMint(_to, newTokenId);
    _incrementTokenId();
  }

  /**
    * @dev calculates the next token ID based on value of _currentTokenId 
    * @return uint256 for the next token ID
    */
  function _getNextTokenId() private view returns (uint256) {
    (bool _overflow, uint256 _sum) = SafeMath.tryAdd(_currentTokenId, 1);
    assert(!_overflow);
    return _sum;
  }

  /**
    * @dev increments the value of _currentTokenId 
    */
  function _incrementTokenId() private  {
    _currentTokenId++;
  }

  function baseTokenURI() virtual public view returns (string memory){}

  function tokenURI(uint256 _tokenId) virtual override public view returns (string memory) {
    return string(abi.encodePacked(baseTokenURI(), Strings.toString(_tokenId)));
  }

  /**
   * Override isApprovedForAll to whitelist user's OpenSea proxy accounts to enable gas-less listings.
   */
  function isApprovedForAll(
    address owner,
    address operator
  )
    override
    public
    view
    returns (bool)
  {
    // Whitelist OpenSea proxy contract for easy trading.
    ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
    if (address(proxyRegistry.proxies(owner)) == operator) {
        return true;
    }

    return super.isApprovedForAll(owner, operator);
  }
}