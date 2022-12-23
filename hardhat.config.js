require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.10",
  networks: {
<<<<<<< HEAD
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_PK}`,
=======
    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_PK}`,
>>>>>>> f848d4b (update metadatas, add mintBatch)
      accounts: [process.env.PK]
    },
  },
  etherscan: {
    apiKey: {
      polygon: process.env.POLYGON_PK
    }
  }
};
