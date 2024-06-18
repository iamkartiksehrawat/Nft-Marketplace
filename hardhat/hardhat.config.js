require("@nomicfoundation/hardhat-toolbox");
const keys = require("./keys.json")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${keys.INFURA_KEY}`,
      accounts: [keys.METAMASK_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: keys.ETHERSCAN_KEY,
    },
  },
  solidity: "0.8.20",
};
