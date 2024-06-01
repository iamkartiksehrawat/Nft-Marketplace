const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("NftMarket", (m) => {
  const NftMarket = m.contract("NftMarket");
  return { NftMarket };
});
