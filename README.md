# DChess

DChess is a decentralized chess game built on the Ethereum blockchain. This application leverages technologies like `Ether.js`, `Metamask`, and `React.js` to provide a seamless gaming experience.

## Solidity Contract

The core of the DChess application is the [DChess](./contracts/Dchess.sol) smart contract. It manages the game state and logic on the blockchain.

Each game is represented as a `Game` struct, which tracks three key pieces of information:

- `White`: The player who made the first move.
- `Moves`: Moves are stored as 16-bit unsigned integers. The least significant 6 bits represent the starting position, and the next 6 bits represent the destination. This compact representation optimizes memory usage while preserving move information.
- `Result`: Indicates the outcome of the game (e.g., win, loss, draw).

The contract supports gameplay against other players or against a computer opponent. All functions in the [DChess contract](./contracts/Dchess.sol) are well-documented and include `require` statements to ensure that they are called by authorized accounts.

Additionally, the contract enforces a fee of `0.05 ethers` per game, showcasing the ability to monetize the service.

## Development Setup and Running the App

To set up a local testing environment, we utilize `hardhat`, a development tool for Ethereum. Follow these steps:

1. Compile the contracts to generate their types, ABI, and bytecode: `npx hardhat compile`.
2. Start a local Ethereum test network: `npx hardhat node`.
3. Deploy the smart contract to the local blockchain by running: `npx hardhat run scripts/DChess.ts --network localhost`.
4. Then start client with `npm run dev`.
