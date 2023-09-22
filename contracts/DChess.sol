// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract DChess {

    enum Result { IN_PROGRESS, WHITE, BLACK, DRAW }

    // Acts like the primary game ID that is being played. 
    uint64 gamesPlayed;
    
    struct Game {
        address white;
        uint16[] moves;
        Result winner;
    }

    // Maps the user to the games they have played
    mapping (address => uint64[]) addressToGames;

    // Stores all the games that have been played
    Game[] games;

    /* 
    * Register a game between between two players and returns the match id
    * 0.05 Ether is required to class a game. The fee is payed by the user who starts the match
    */
    function initGame(address player) public payable returns (uint64) {
        require(msg.value >= 0.05 ether, "Please send atleast 0.05 ether to play the game!");

        addressToGames[msg.sender].push(gamesPlayed);

        // In case of non-multiplayer games, the client should send a 0 address
        if (player == address(0x0)) {
            addressToGames[player].push(gamesPlayed);
        }

        Game memory currentGame;
        currentGame.winner = Result.IN_PROGRESS;
        currentGame.white = msg.sender;
        games.push(currentGame);

        // Increment the id 
        gamesPlayed++;

        // Return the correct id of the game
        return gamesPlayed - 1;
    }

    /*
    * Ends the game and assigns a winner
    */
    function endGame(uint64 gameId, bool isSystem, uint result) public  {
        require(gameId < gamesPlayed, "Please send a valid game id.");
        require(isSystem || isAPlayer(gameId), "You can only end the games that you are playing");
        
        if (result == 1) 
            games[gameId].winner = Result.WHITE;
        else if (result == 2) 
            games[gameId].winner = Result.BLACK;
        else 
            games[gameId].winner = Result.DRAW;
    }

    function makeMove(uint64 gameId, bool isSystem, uint8 from, uint8 to) public {

    }

    /*
    * View that returns if the sender is playing the particular game or not
    */
    function isAPlayer(uint64 gameId) public view returns (bool) {
        for (uint i = 0; i < addressToGames[msg.sender].length; i++) {
            if (addressToGames[msg.sender][i] == gameId) {
                return true;
            }
        }

        return false;
    }
}
