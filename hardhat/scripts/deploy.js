const MarketModule = require("../ignition/modules/NftMarket");
const path = require("path");
const fs = require("fs");

async function main() {
  const { NftMarket } = await hre.ignition.deploy(MarketModule);
  console.log("Deployed !!");
  const adrs = await NftMarket.getAddress();
  savecontractfiles(NftMarket, adrs);
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

main().catch(console.error);
