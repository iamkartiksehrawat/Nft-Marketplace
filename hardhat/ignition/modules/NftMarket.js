const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("NftMarket", (m) => {
  const NftMarket = m.contract("NftMarket", [
    "0x059fA0dbfb6D4f23Ec39bB8fC8FeF2641a3626A3",
  ]);
  return { NftMarket };
});
