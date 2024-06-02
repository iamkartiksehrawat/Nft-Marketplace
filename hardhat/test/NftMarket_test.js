const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NftMarket", function () {
  let nftMarket;
  let owner;
  let addr1;
  let addr2;

  const deployedContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  before(async function () {
    [owner, addr1, addr2, _] = await ethers.getSigners();

    const NftMarket = await ethers.getContractFactory("NftMarket");
    nftMarket = await NftMarket.attach(deployedContractAddress);
  });

  describe("Mint token", function () {
    const tokenURI = "https://testing.com";

    before(async function () {
      await nftMarket.mintToken(tokenURI, { from: owner.address });
    });

    it("owner of first token should be owner.address", async function () {
      const ownerOfToken = await nftMarket.ownerOf(1);
      expect(ownerOfToken).to.equal(owner.address);
    });

    it("token id should be pointing to the given tokenURI", async function () {
      const actualtokenuri = await nftMarket.tokenURI(1);
      expect(actualtokenuri).to.equal(tokenURI);
    });
  });
});
