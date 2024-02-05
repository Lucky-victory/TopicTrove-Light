import { BigNumber, Wallet, getDefaultProvider, utils} from "ethers";
require('dotenv').config()
import { ethers, run, network } from "hardhat";
import {Platform__factory, AuthorVerificationBadge__factory, Treasury__factory,  } from "../typechain-types";

const encoder = ethers.utils.defaultAbiCoder;
const treasuryAddr = "0x9E1eF5A92C9Bf97460Cd00C0105979153EA45b27"
const platformAddr = "0x3a65168B746766066288B83417329a7F901b5569"
const authorVerificationBadgeAddr = "0x6D919b8dC30BEf41b56Aa8b18b2052c9459F8E9A"

const privateKey = process.env.PRIVATE_KEY as string;
const wallet = new Wallet(privateKey);

const lightLinkRpc = "https://replicator.pegasus.lightlink.io/rpc/v1"



async function main() {
    //await deployplatformContracts();
  
    //await setupNFTs(authorVerificationBadgeAddr, platformAddr);
    //await joinplatform("0x3A3bc7C19bE0381294d8E7Bd311C123b76b33982");

    
    await verifyContract()
    const chainID = network.config.chainId;
    if (chainID != 31337) {
        await verifyContract()
    }
 
    //await joinplatform(platformContract);
}

async function deployTreasury() {
    //console.log("Deploying Treasury....");

    //const provider = getDefaultProvider(rpc)
    //const connectedWallet = wallet.connect(provider);
    //const TreasuryFactory = new Treasury__factory(connectedWallet);

    const TreasuryFactory = await ethers.getContractFactory("Treasury");
    const treasury = await TreasuryFactory.deploy();
    await treasury.deployed();
    console.log("---- Treasury Contract was deployed to: ---- ", treasury.address);
    return treasury.address;
}

async function deployAuthorVerificationBadge(_platformAddr: any) {
    //console.log("Deploying AuthorVerificationBadge....");
    const AuthorVerificationBadgeFactory = await ethers.getContractFactory("AuthorVerificationBadge");
    const AuthorVerificationBadge = await AuthorVerificationBadgeFactory.deploy(_platformAddr, {gasLimit: 8000000});
    await AuthorVerificationBadge.deployed();
    console.log("---- AuthorVerificationBadge Contract was deployed to: ---- ", AuthorVerificationBadge.address);
    return AuthorVerificationBadge.address;
}

// async function joinplatform(_platformAddr: any) {
    
//     const provider = getDefaultProvider(lightLinkRpc);
//     const connectedWallet = wallet.connect(provider);

//     const platformFactory = new Platform__factory(connectedWallet);
//     const platform = platformFactory.attach(_platformAddr);

//     console.log("joining platform network...")
//     const amount = ethers.utils.parseEther("0.01");
//     //const tx = await platform.registerUser("hello", "nft", {gasLimit: 6000000, value: amount})
//     const tx = await platform.verificationBadge()
//     //await tx.wait();
//     console.log(tx)
//     console.log("platform network successfully joined")
// }

async function setupNFTs(_AuthorVerificationBadgeAddr: any, _platformAddr: any ) {
   
    const provider = getDefaultProvider(lightLinkRpc);
    const connectedWallet = wallet.connect(provider);

    const platformFactory = new Platform__factory(connectedWallet);
    const platform = platformFactory.attach(_platformAddr);

    try {
        console.log("Setting up NFTs for LightLink")
        const tx = await platform.setNFTs(_AuthorVerificationBadgeAddr);
        await tx.wait();
        console.log("NFTs setup successful")
    }

    catch (error) {
        console.log(`[source] platform.setNFTs ERROR!`);
        console.log(`[source]`, error);

    }
}


async function deployplatformContracts() {
    console.log("Deploying Contracts for LightLink....");
    let treasuryAddr;
    let platformAddr;
    try {
        console.log("Deploying treasury for LightLink");
        treasuryAddr = await deployTreasury();

        const platformFactory = await ethers.getContractFactory("Platform"/*, wallet*/);

        console.log("Deploying platform contract for LightLink");
        const platform = await platformFactory.deploy();
        await platform.deployed();
        platformAddr = platform.address;
        console.log("---- platform Contract for LightLink was deployed to LightLink testnet at this address: ---- ", platform.address);
    }
    catch (error) {
        console.error("Error deploying platform for LightLink:", error);
        throw error;
    }

    console.log("Deploying AuthorVerificationBadge for LightLink....");
    let AuthorVerificationBadge;
    try {
        AuthorVerificationBadge = await deployAuthorVerificationBadge(platformAddr);
    }
    catch (error) {
        console.error("Error Author Verification Badge for LightLink:", error);
        throw error;
    }

}

async function verifyContract() {

    console.log(`Verifying User NFT contract for LightLink...`);

    try {
        await run("verify:verify", {
            address: platformAddr,
            constructorArguments: [],
        });
        //console.log(`contract for ${chain.name} verified`);
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!");
        } else {
            console.log(e);
        }
    }
}


main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
