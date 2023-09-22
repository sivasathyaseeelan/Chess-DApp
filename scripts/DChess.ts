import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { DChess } from "../typechain-types";
import fs from "fs";

function saveDeploymentAddress(contract: DChess, name: string) {
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
	fs.writeFileSync(contractsDir + "artifact.json", JSON.stringify(contractArtifact, null, 2));

	console.log("Deployment details stored successfully for the client.");
}

async function deploy() {
	// Getting the deployment information
	const [deployer] = await ethers.getSigners();
	console.log("Deploying contracts with the account:", deployer.address);
	console.log("Account balance:", (await deployer.getBalance()).toString());

	// Deploying the contract
	const DChess = await ethers.getContractFactory("DChess");
	const dChess = await DChess.deploy();
	await dChess.deployed();

	return dChess;
}

async function postDeploy(dchess: DChess) {
	console.log("The function has been deployed successfully.");
	saveDeploymentAddress(dchess, "DChess");
}

deploy().then(postDeploy);
