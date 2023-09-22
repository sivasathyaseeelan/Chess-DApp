import React, { useState, useMemo, useCallback } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Move } from 'chess.js';
import { toast } from 'react-toastify';
import { Container } from '@mui/material';

type MoveType = {
  from: string;
  to: string;
  color: string;
};

function Game() {
  const chess = useMemo(() => new Chess(), []);
  const [fen, setFen] = useState(chess.fen());
  const [, setOver] = useState('');

  const makeAMove = useCallback(
    (move: MoveType): Move | null => {
      try {
        const result = chess.move(move);
        // Update fen state to trigger a re-render
        setFen(chess.fen());

        if (chess.isGameOver()) {
          if (chess.isCheckmate()) {
            setOver(`Checkmate! ${chess.turn() === 'w' ? 'Black' : 'White'} wins!`);
          } else if (chess.isDraw()) {
            setOver('Draw!');
          } else {
            setOver('Game over!');
          }
        }

        return result;
      } catch (e) {
        console.log(e);
        toast.error('Not a valid move!');
        // Null if the move was illegal
        return null;
      }
    },
    [chess]
  );

  function makeRandomMove() {
    const possibleMoves = chess.moves();
    const randomIdx = Math.floor(Math.random() * possibleMoves.length);
    return chess.move(possibleMoves[randomIdx]);
  }

  // Whenever a piece is moved, check if the move was valid and move the computer's turn
  function onDrop(sourceSquare: string, targetSquare: string): boolean {
    const moveData = {
      from: sourceSquare,
      to: targetSquare,
      color: chess.turn()
    };

    const move = makeAMove(moveData);
    if (move !== null && !chess.isGameOver() && chess.turn() === 'b') {
      makeRandomMove();
      setFen(chess.fen());
    }
    return move !== null;
  }

  return (
    <Container>
      <div className="board">
        <Chessboard position={fen} onPieceDrop={onDrop} />
      </div>
    </Container>
  );
}

export default Game;
