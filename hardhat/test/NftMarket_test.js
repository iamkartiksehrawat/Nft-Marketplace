const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NftMarket", function () {
  let nftMarket;
  let owner;
  let otheraccount;
  let _nftPrice = ethers.parseEther("0.3").toString();
  let _listingPrice = ethers.parseEther("0.025").toString();

  const deployedContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  before(async function () {
    [owner, otheraccount] = await ethers.getSigners();
    const NftMarket = await ethers.getContractFactory("NftMarket");
    nftMarket = await NftMarket.attach(deployedContractAddress);
  });

  describe("Mint token", function () {
    const tokenURI = "https://testing.com";

    before(async function () {
      await nftMarket.mintToken(tokenURI, _nftPrice, {
        from: owner.address,
        value: _listingPrice,
      });
    });

    it("owner of first token should be owner.address", async function () {
      const ownerOfToken = await nftMarket.ownerOf(1);
      expect(ownerOfToken).to.equal(owner.address);
    });

    it("token id should be pointing to the given tokenURI", async function () {
      const actualtokenuri = await nftMarket.tokenURI(1);
      expect(actualtokenuri).to.equal(tokenURI);
    });

    it("should not be possible to create a NFT with used tokenURI", async function () {
      try {
        await nftMarket.mintToken(tokenURI, _nftPrice, {
          from: owner.address,
          value: _listingPrice,
        });
      } catch (e) {
        console.log("Test Case Passed");
        expect(e.message).to.include("Token URI already exists");
      }
    });

    it("Should have one listed item", async () => {
      const listedItems = await nftMarket.listedItemsCount();
      expect(listedItems.toString()).to.equal("1");
    });

    it("should have create NFT item", async () => {
      const nftItem = await nftMarket.getNftItem(1);

      expect(nftItem.tokenId).to.equal(1);
      expect(nftItem.price).to.equal(_nftPrice);
      expect(nftItem.creator).to.equal(owner.address);
      expect(nftItem.isListed).to.equal(true);
    });
  });

  describe("Buy NFT", function () {
    before(async () => {
      try {
        await nftMarket.connect(otheraccount).buyNft(1, {
          from: otheraccount.address,
          value: _nftPrice,
        });
      } catch (e) {
        console.log(e);
      }
    });

    it("should unlist the item", async () => {
      const listedItem = await nftMarket.getNftItem(1);
      expect(listedItem.isListed).to.equal(false);
    });

    it("should decrease listed items count", async () => {
      const listedItemsCount = await nftMarket.listedItemsCount();
      expect(listedItemsCount.toString()).to.equal("0");
    });

    it("should change the owner", async () => {
      const currentOwner = await nftMarket.ownerOf(1);
      expect(currentOwner).to.equal(otheraccount.address);
    });
  });

  describe("Token transfers", () => {
    const tokenURI = "https://test-json-2.com";
    before(async () => {
      await nftMarket.mintToken(tokenURI, _nftPrice, {
        from: owner.address,
        value: _listingPrice,
      });
    });

    it("should have two NFTs created", async () => {
      const totalSupply = await nftMarket.totalSupply();
      expect(totalSupply.toString()).to.equal("2");
    });

    it("should be able to retreive nft by index", async () => {
      const nftId1 = await nftMarket.tokenByIndex(0);
      const nftId2 = await nftMarket.tokenByIndex(1);

      expect(nftId1.toString()).to.equal("1");
      expect(nftId2.toString()).to.equal("2");
    });

    it("should have only 1 nft on sale", async () => {
      const nftonsale = await nftMarket.getAllNftsOnSale();
      expect(nftonsale.length).to.equal(1);
      expect(nftonsale[0].tokenId).to.equal(2);
    });
  });
});
