require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "localhost",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      url: "http://127.0.0.1:8545", // Local Hardhat node
      chainId: 1337, // Chain ID for Hardhat local network
    },
  },
  solidity: "0.8.20",
};
