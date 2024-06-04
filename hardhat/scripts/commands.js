async function main() {
  let nftMarket;
  let owner;

  const deployedContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  [owner] = await ethers.getSigners();
  const NftMarket = await ethers.getContractFactory("NftMarket");
  nftMarket = await NftMarket.attach(deployedContractAddress);

  await nftMarket.mintToken(
    "https://apricot-worrying-krill-556.mypinata.cloud/ipfs/Qmf1896XEJFFhTDijLZLvL67NtmkV6ZTxNt2uDyRwHxahj?pinataGatewayToken=06G0QaMSUrmzgObBpIwYK2RaBjWsvHAMDK9ZnSpPd9NIUmY6HZtCCYbxgX8WWgeC",
    "2000000000000000000",
    {
      value: "25000000000000000",
      from: owner.address,
    }
  );

  console.log(await nftMarket.getAllNftsOnSale());
  console.log(await nftMarket.tokenURI(1));
}

main().catch(console.error);
