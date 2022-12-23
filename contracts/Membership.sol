// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract Membership is ERC1155, Ownable, ERC1155Supply {

    uint256 public constant DAZZLING_DIAMOND = 1;
    uint256 public constant BOMBASTIC_GOLD = 2;
    uint256 public constant AMAZING_SILVER = 3;
    uint256 public constant GLORIOUS_BRONZE = 4;

    mapping(uint256 => uint256) public tokenIdToSupply;
    mapping(uint256 => uint256) public tokenIdToMintPrice;

    string private _uri;

    constructor() ERC1155("https://bafybeigie22kzon3mlsdd2vpczylputmo3gxxz6cskumrkpl7owhzrhn5i.ipfs.nftstorage.link/metadatas/") {
        tokenIdToMintPrice[DAZZLING_DIAMOND] = 0.005 ether;
        tokenIdToMintPrice[BOMBASTIC_GOLD] = 0.003 ether;
        tokenIdToMintPrice[AMAZING_SILVER] = 0.002 ether;
        tokenIdToMintPrice[GLORIOUS_BRONZE] = 0.001 ether;

        tokenIdToSupply[DAZZLING_DIAMOND] = 1;
        tokenIdToSupply[BOMBASTIC_GOLD] = 20;
        tokenIdToSupply[AMAZING_SILVER] = 30;
        tokenIdToSupply[GLORIOUS_BRONZE] = 40;
    }



    function getTotalSupply(uint256 id) public view returns (uint256) {
        return totalSupply(id);
    }

    function updateMaxSupply(uint256 id, uint256 amount) public onlyOwner {
        tokenIdToSupply[id] = amount;
    }

    function updateMintPrice(uint256 id, uint256 price) external onlyOwner {
        tokenIdToMintPrice[id] = price;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function uri(uint256 _id) public view virtual override returns (string memory) {
        require(exists(_id));
        return string(abi.encodePacked(super.uri(_id), Strings.toString(_id)));
    }

    function mint(address _address, uint256 id) public payable {
        require(totalSupply(id) < tokenIdToSupply[id], "Supply max reached");
        require(id < 5, "Sorry you're trying to mint the wrong NFT.");
        require(msg.value == tokenIdToMintPrice[id], "Not enough money");
        _mint(_address, id, 1, "");
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    function withdraw(address _addr) external onlyOwner {
        uint256 balance = address(this).balance;
        payable(_addr).transfer(balance);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
