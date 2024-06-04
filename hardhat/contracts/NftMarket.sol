// SPDX-License-Identifier: MIT
pragma solidity >=0.4.44 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NftMarket is ERC721URIStorage {

  uint256 private _listedItems;
  uint256 private _tokenIds;
  uint public listingPrice = 0.025 ether;

  struct NftItem{
  uint tokenId;
  uint price;
  address creator;
  bool isListed;
  }

  mapping(string => bool) private _usedTokenURIs;
  mapping(uint => NftItem) private _idtoNftItem;

  event NftItemCreated(
    uint tokenId,
    uint price,
    address creator,
    bool islisted
  );

  constructor() ERC721("CreaturesNFT", "CNFT") {}

  function getNftItem(uint tokenId) public view returns(NftItem memory){
    return _idtoNftItem[tokenId];
  }

  function listedItemsCount() public view returns (uint){
    return _listedItems;
  }

  function tokenURIExits(string memory tokenURI) public view returns(bool){
    return _usedTokenURIs[tokenURI];
  }

  function mintToken(string memory tokenURI,uint price) public payable returns(uint){
    require(!tokenURIExits(tokenURI),"Token URI already exists");
    require(msg.value==listingPrice,"Price must be equal to listing Price");

    _tokenIds+=1;
    _listedItems+=1;

    uint newTokenId= _tokenIds;

    _safeMint(msg.sender,newTokenId);
    _setTokenURI(newTokenId,tokenURI);
    _createNftItem(newTokenId,price);
    _usedTokenURIs[tokenURI]=true;

    return newTokenId;
  }

  function _createNftItem(uint tokenId, uint price) private {
    require(price>0,"Price must be atleast 1 Wei");
    _idtoNftItem[tokenId]=NftItem(tokenId,price,msg.sender,true);
    emit NftItemCreated(tokenId,price,msg.sender,true);
  }

  
}
