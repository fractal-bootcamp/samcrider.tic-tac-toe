import { useEffect, useState } from "react";
import { Cell, GameState, TurnEnum } from "./types";

const defaultGameState: GameState = {
  currentGameFinished: false,
  winner: { playerX: 0, playerO: 0 },
  ties: 0,
};

const defaultBoard: Cell[] = [
  { id: 0, value: null },
  { id: 1, value: null },
  { id: 2, value: null },
  { id: 3, value: null },
  { id: 4, value: null },
  { id: 5, value: null },
  { id: 6, value: null },
  { id: 7, value: null },
  { id: 8, value: null },
];

export const useBoardData = () => {
  const [board, setBoard] = useState<Cell[]>(defaultBoard);
  const [turn, setTurn] = useState<TurnEnum>(TurnEnum.X);
  const [gameState, setGameState] = useState<GameState>(defaultGameState);

  const possibleWinPositions: (TurnEnum | null)[][] = [
    [board[0].value, board[1].value, board[2].value],
    [board[3].value, board[4].value, board[5].value],
    [board[6].value, board[7].value, board[8].value],
    [board[0].value, board[3].value, board[6].value],
    [board[1].value, board[4].value, board[7].value],
    [board[2].value, board[5].value, board[8].value],
    [board[0].value, board[4].value, board[8].value],
    [board[2].value, board[4].value, board[6].value],
  ];

  const checkWinner = () => {
    possibleWinPositions.every((possibleWinPosition) => {
      // loop through each possibility
      const currentGameState = possibleWinPosition.reduce((curr, acc) => {
        // if current value is null, there is no win in current possibility
        if (!curr) {
          return null;
        }
        if (curr === acc) {
          return curr;
        }
        return null;
      });

      // there is no win condition
      if (!currentGameState) {
        // if the board is full
        if (!board.find((cell) => !cell.value)) {
          setGameState({
            ...gameState,
            ties: gameState.ties + 1,
            currentGameFinished: true,
          });
          return false;
        }
        // just return if board isn't full
        return true;
      }

      // if win condition found, set accordingly
      if (currentGameState === TurnEnum.X) {
        setGameState({
          ...gameState,
          winner: {
            ...gameState.winner,
            playerX: gameState.winner.playerX + 1,
          },
          currentGameFinished: true,
        });
        return false;
      }

      if (currentGameState === TurnEnum.O) {
        setGameState({
          ...gameState,
          winner: {
            ...gameState.winner,
            playerO: gameState.winner.playerO + 1,
          },
          currentGameFinished: true,
        });
        return false;
      }
      return true;
    });
  };

  useEffect(() => {
    checkWinner();
  }, [board]);

  const handleClick = (cell: Cell) => {
    const newBoard = board.map((currCell) => {
      if (currCell.id === cell.id) {
        const newVal = currCell.value ? null : turn;
        if (!newVal) {
          return currCell;
        }
        return { ...currCell, value: newVal };
      }
      return currCell;
    });
    setBoard(newBoard);
    setTurn(turn === "X" ? TurnEnum.O : TurnEnum.X);
  };

  const handleReset = () => {
    setBoard(defaultBoard);
    setTurn(TurnEnum.X);
    setGameState({ ...gameState, currentGameFinished: false });
  };

  return { handleClick, handleReset, board, gameState };
};
