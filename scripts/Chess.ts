import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { Chess } from "../typechain-types";
import fs from "fs";

function saveDeploymentAddress(contract: Chess, name: string) {
  const contractsDir = __dirname + `/../client/src/data/contracts/${name}/`;
  if (!fs.existsSync(contractsDir)) fs.mkdirSync(contractsDir);

  // Store the address
  fs.writeFileSync(
    contractsDir + "address.json",
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  // Store the generated artifacts
  // @ts-expect-error
  const contractArtifact = artifacts.readArtifactSync(name);
  fs.writeFileSync(
    contractsDir + "artifact.json",
    JSON.stringify(contractArtifact, null, 2)
  );

  console.log("Deployment details stored successfully for the client.");
}

async function deploy() {
  // Getting the deployment information
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploying the contract
  const Chess = await ethers.getContractFactory("Chess");
  const chess = await Chess.deploy();
  await chess.deployed();

  return chess;
}

async function postDeploy(chess: Chess) {
  console.log("The function has been deployed successfully.");
  saveDeploymentAddress(chess, "Chess");
}

deploy().then(postDeploy);
