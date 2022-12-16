const { assert, expect } = require("chai");
const hre = require("hardhat");

describe('Tests PremiumMembership', function () {
  let contract;
  let owner;
  let user

  before(async function () {
      [owner, user] = await ethers.getSigners();
      const Contract = await ethers.getContractFactory('GetTheMembership');
      contract = await Contract.deploy();
  });

  it("should have the right id", async function () {
      const idDiamond = await contract.DAZZLING_DIAMOND();
      const idGold = await contract.BOMBASTIC_GOLD();
      const idSilver = await contract.PRESTIGIOUS_SILVER();
      const idBronze = await contract.GLORIOUS_BRONZE();

      expect(idDiamond).to.equal(1);
      expect(idGold).to.equal(2);
      expect(idSilver).to.equal(3);
      expect(idBronze).to.equal(4);
  });

  it("should have the right supply", async function () {
      const supplyDiamond = await contract.tokenIdToSupply(1);
      const supplyGold = await contract.tokenIdToSupply(2);
      const supplySilver = await contract.tokenIdToSupply(3);
      const supplyBronze = await contract.tokenIdToSupply(4);

      expect(supplyDiamond).to.equal(1);
      expect(supplyGold).to.equal(20);
      expect(supplySilver).to.equal(30);
      expect(supplyBronze).to.equal(40);
  });

  it("should have the right mint price", async function () {
    const mintPriceDiamond = await contract.tokenIdToMintPrice(1);
    const mintPriceGold = await contract.tokenIdToMintPrice(2);
    const mintPriceSilver = await contract.tokenIdToMintPrice(3);
    const mintPriceBronze = await contract.tokenIdToMintPrice(4);

    expect(mintPriceDiamond).to.equal(5000000000000000);
    expect(mintPriceGold).to.equal(3000000000000000);
    expect(mintPriceSilver).to.equal(2000000000000000);
    expect(mintPriceBronze).to.equal(1000000000000000);
  });

  it("should return the total supply", async function () {
    await contract.mint(owner.address, 1, {value: 5000000000000000});
    const totalSupplyDiamond = await contract.getTotalSupply(1)
    expect(totalSupplyDiamond).to.equal(1);
  });

  it("should update the max supply", async function () {
    await contract.updateMaxSupply(1, 40);
    const totalSupplyDiamond = await contract.tokenIdToSupply(1)
    expect(totalSupplyDiamond).to.equal(40);
  });

  it("should update the mint price and mint should work", async function () {

    let mintPriceDiamond = await contract.tokenIdToMintPrice(1);
    await contract.updateMintPrice(1, "1000000000000000000");
    mintPriceDiamond = await contract.tokenIdToMintPrice(1)
    await contract.mint(owner.address, 1, { value: "1000000000000000000" })
    const totalSupplyDiamond = await contract.getTotalSupply(1)
    expect(mintPriceDiamond).to.equal(BigInt(1000000000000000000));
    expect(totalSupplyDiamond).to.equal(2);
  });

  it("should be able to mint a NFT", async function() {
    const balanceBeforeMint = await contract.balanceOf(user.address, 1);
    expect(balanceBeforeMint).to.equal(0);
    await contract.connect(user).mint(user.address, 1, { value: "1000000000000000000" });
    const balanceAfterMint = await contract.balanceOf(user.address, 1);
    expect(balanceAfterMint).to.equal(1);
  })

  it("should revert withdraw transaction", async function() {
    await expect(contract.connect(user).withdraw(user.address))
    .to.be.revertedWith("Ownable: caller is not the owner");
  })
})
