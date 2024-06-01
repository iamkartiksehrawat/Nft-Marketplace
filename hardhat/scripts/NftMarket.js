const hre = require("hardhat");
const path = require("path");
const fs = require("fs");

async function main() {
  console.log("Deployment Process Started....");
  const [deployer] = await ethers.getSigners();
  const address = await deployer.getAddress();
  console.log(`Deploying account with address: ${address}`);
  const MyContract = await ethers.getContractFactory("NftMarket");
  const contract = await MyContract.deploy();
  await contract.waitForDeployment();
  const adrs = await contract.getAddress();
  console.log(`Contract deployed to ${adrs}`);
  const name = await contract.name();
  const symbol = await contract.symbol();
  console.log("Name:", name);
  console.log("Symbol:", symbol);
  savecontractfiles(contract, adrs);
}

function savecontractfiles(contract, adrs) {
  const contractdir = path.join(
    __dirname,
    "..",
    "..",
    "marketplace",
    "public",
    "contracts"
  );

  if (!fs.existsSync(contractdir)) {
    fs.mkdirSync(contractdir);
  }

  fs.writeFileSync(
    path.join(contractdir, `contract-address-${network.name}.json`),
    JSON.stringify({ NftMarket: adrs }, null, 2)
  );

  const Nftmarketartifact = artifacts.readArtifactSync("NftMarket");
  fs.writeFileSync(
    path.join(contractdir, "NftMarket.json"),
    JSON.stringify(Nftmarketartifact, null, 2)
  );
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
