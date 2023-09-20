// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Chess{

    enum Result {PROGRESS,WHITE,BLACK,DRAW}

    uint64 gamesPlayed;

    struct Game {
        address white;
        uint64[] moves;
        Result winner;
    }

    mapping (address=>uint64[]) addressToGames;

    Game[] games;


    function initGame(address player) public payable returns(uint64) {
        require(msg.value >= 0.05 ether, "Please send atleast 0.05 ether to play the game!");
        addressToGames[msg.sender].push(gamesPlayed);

        if(player == address(0x0)){
            addressToGames[player].push(gamesPlayed);
        }

        Game memory currentGame;
        currentGame.winner = Result.PROGRESS;
        currentGame.white = msg.sender;
        games.push(currentGame);

        gamesPlayed++;

        return gamesPlayed - 1;
    }

    function endGame(uint64 gameId,bool isSystem,uint result) public {
        require(gameId<gamesPlayed, "Please send a valid game id.");
        require(isSystem || isAplayer(gameId), "You can only end the games that you are playing");

        if(result == 1)
            games[gameId].winner = Result.WHITE;
        else if (result == 2) 
            games[gameId].winner = Result.BLACK;
        else 
            games[gameId].winner = Result.DRAW;
    }

    function isAplayer(uint gameId) public view returns (bool) {
        for(uint i = 0; i < addressToGames[msg.sender].length; i++){
            if(addressToGames[msg.sender][i] == gameId){
                return true;
            }
        }

        return false;
    }
}