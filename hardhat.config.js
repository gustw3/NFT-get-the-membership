require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.10",
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_PK}`,
      accounts: [process.env.PK]
    },
  },
  etherscan: {
    apiKey: process.env.POLYGON_PK
  }
};
