// SPDX-License-Identifier: MIT

pragma solidity ^0.7.1;

contract Stocks {
    address owner;
    constructor() {
        owner = msg.sender;
    }
    /// quote structure
    struct Stock {
        uint price;
        uint volume;
    }

     mapping( bytes4 => Stock) stockQuote;
    
     /// Contract owner
    modifier onlyOwner {
        require(msg.sender == owner,"Only owner can call this function.");
        _;
    }
   
    /// Set the value of a stock
    function setStock(bytes4 symbol, uint price, uint volume) onlyOwner public {
        Stock memory _Stock = Stock({price: price, volume: volume});
        stockQuote[symbol] = _Stock;
    }
    
    /// Get the value of a stock
    function getStockPrice(bytes4 symbol) public view returns (uint) {
        return stockQuote[symbol].price;
    }
    
    /// Get the value of volume traded for a stock
    function getStockVolume(bytes4 symbol) public view returns (uint) {
        return stockQuote[symbol].volume;
    }
}