// SPDX-License-Identifier: MIT
pragma solidity >=0.4.44 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NftMarket is ERC721URIStorage {

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

  //events
  event NftItemCreated(
    uint tokenId,
    uint price,
    address creator,
    bool islisted
  );


  //Constructor
  constructor() ERC721("CreaturesNFT", "CNFT") {}

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

  //override
  function _update(address to, uint256 tokenId, address auth) internal virtual override returns (address) {
    // parent function
    address from = super._update(to, tokenId, auth);

    // minting
    if (from == address(0)) {
      _addTokenToAllTokensEnumaration(tokenId);
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

  
}
