const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("nft", function () {
  it("Should mint and transfer NFT to buyer", async function () {
    const DumbGuys = await ethers.getContractFactory("DumbGuys");
    const dumbGuys = await DumbGuys.deploy();
    await dumbGuys.deployed();

    const buyer = '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199';
    const metadataURI = 'cid/test.png';
    
    let balance = await dumbGuys.balanceOf(buyer);
    expect(balance).to.equal(0);

    const newlyMintedToken = await dumbGuys.payToMint(buyer, metadataURI, { value: ethers.utils.parseEther('0.05') })
  
    await newlyMintedToken.wait();
    balance = await dumbGuys.balanceOf(buyer);
    expect(balance).to.equal(1);

    expect(await dumbGuys.isContentOwned(metadataURI)).to.equal(true);
  });
});
