// SPDX-License-Identifier: MIT
pragma solidity >=0.4.44 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NftMarket is ERC721URIStorage,Ownable {

  uint public listingPrice = 0.025 ether;

  //private variables
  uint256 private _listedItems;
  uint256 private _tokenIds;
  uint256[] private _allNfts;

  //structs
  struct NftItem{
  uint tokenId;
  uint price;
  address creator;
  bool isListed;
  }

  //mappings
  mapping(string => bool) private _usedTokenURIs;
  mapping(uint => NftItem) private _idtoNftItem;
  mapping(uint => uint) private _idtoNftIndex;
  mapping(address => mapping(uint => uint)) private _ownedTokens;
  mapping(uint => uint) private _idToOwnedIndex;

  //events
  event NftItemCreated(
    uint tokenId,
    uint price,
    address creator,
    bool islisted
  );


  //Constructor
  constructor(address initialOwner) ERC721("CreaturesNFT", "CNFT") Ownable(initialOwner) {}

  function setListingPrice(uint newPrice) external onlyOwner{
    require(newPrice > 0, "Price must be at least 1 wei");
    listingPrice = newPrice;
  }

  //Public Functions
  function getNftItem(uint tokenId) public view returns(NftItem memory){
    return _idtoNftItem[tokenId];
  }

  function listedItemsCount() public view returns (uint){
    return _listedItems;
  }

  function tokenURIExits(string memory tokenURI) public view returns(bool){
    return _usedTokenURIs[tokenURI];
  }

  function totalSupply() public view returns(uint){
    return _allNfts.length;
  }

  function tokenByIndex(uint index) public view returns(uint){
    require(index<totalSupply(),"Index out of bounds");
    return _allNfts[index];
  }


  function tokenOfOwnerByIndex(address owner, uint index) public view returns (uint) {
    require(index < ERC721.balanceOf(owner), "Index out of bounds");
    return _ownedTokens[owner][index];
  }

  function getAllNftsOnSale() public view returns (NftItem[] memory) {
    uint allItemsCounts = totalSupply();
    uint currentIndex =0;
    NftItem[] memory items = new NftItem[](_listedItems);

    for(uint i=0;i<allItemsCounts;i++)
    {
      uint tokenId = tokenByIndex(i);
      NftItem storage item = _idtoNftItem[tokenId];

      if(item.isListed==true)
      {
        items[currentIndex]=item;
        currentIndex+=1;
      }
    }

    return items;
  }

  function getOwnedNfts() public view returns (NftItem[] memory) {
    uint ownedItemsCount = ERC721.balanceOf(msg.sender);
    NftItem[] memory items = new NftItem[](ownedItemsCount);

    for (uint i = 0; i < ownedItemsCount; i++) {
      uint tokenId = tokenOfOwnerByIndex(msg.sender, i);
      NftItem storage item = _idtoNftItem[tokenId];
      items[i] = item;
    }

    return items;
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

  function buyNft(uint tokenId) public payable {
    uint price= _idtoNftItem[tokenId].price;
    address owner = ERC721.ownerOf(tokenId);

    require(msg.sender!=owner,"You already own this NFT");
    require(msg.value == price,"Please submit the asking price");

    _idtoNftItem[tokenId].isListed=false;
    _listedItems--;

    _transfer(owner,msg.sender,tokenId);
    
    payable(owner).transfer(msg.value);
  }

  function placeNftOnSale(uint tokenId, uint newPrice) public payable {
    require(ERC721.ownerOf(tokenId) == msg.sender, "You are not owner of this nft");
    require(_idtoNftItem[tokenId].isListed == false, "Item is already on sale");
    require(msg.value == listingPrice, "Price must be equal to listing price");

    _idtoNftItem[tokenId].isListed = true;
    _idtoNftItem[tokenId].price = newPrice;
    _listedItems+=1;
  }

  function _update(address to, uint256 tokenId, address auth) internal virtual override returns (address) {
    
    address from = super._update(to, tokenId, auth);
  
    if (from == address(0)) {
      _addTokenToAllTokensEnumaration(tokenId);
    }else if(to!=from){
      _removeTokenFromOwnerEnumaration(from, tokenId);
    }

    if(to==address(0))
    {
      _removeTokenFromAllTokensEnumaration(tokenId);
    } else if (to != from) {
      _addTokenToOwnerEnumaration(to, tokenId);
    }

    return from;
}

  //private Functions
  function _createNftItem(uint tokenId, uint price) private {
    require(price>0,"Price must be atleast 1 Wei");
    _idtoNftItem[tokenId]=NftItem(tokenId,price,msg.sender,true);
    emit NftItemCreated(tokenId,price,msg.sender,true);
  }

  function _addTokenToAllTokensEnumaration(uint tokenId) private{
    _idtoNftIndex[tokenId]=_allNfts.length;
    _allNfts.push(tokenId);
  }

  function _addTokenToOwnerEnumaration(address to, uint tokenId) private {
    uint length = ERC721.balanceOf(to)-1;
    _ownedTokens[to][length] = tokenId;
    _idToOwnedIndex[tokenId] = length;
  }

  function _removeTokenFromOwnerEnumaration(address from, uint tokenId) private {
    uint lastTokenIndex = ERC721.balanceOf(from);
    uint tokenIndex = _idToOwnedIndex[tokenId];

    if (tokenIndex != lastTokenIndex) {
      uint lastTokenId = _ownedTokens[from][lastTokenIndex];

      _ownedTokens[from][tokenIndex] = lastTokenId;
      _idToOwnedIndex[lastTokenId] = tokenIndex;
    }

    delete _idToOwnedIndex[tokenId];
    delete _ownedTokens[from][lastTokenIndex];
  }

  function _removeTokenFromAllTokensEnumaration(uint tokenId) private {
    uint lastTokenIndex = _allNfts.length - 1;
    uint tokenIndex = _idtoNftIndex[tokenId];
    uint lastTokenId = _allNfts[lastTokenIndex];

    _allNfts[tokenIndex] = lastTokenId;
    _idtoNftIndex[lastTokenId] = tokenIndex;

    delete _idtoNftIndex[tokenId];
    _allNfts.pop();
  }
  
}
