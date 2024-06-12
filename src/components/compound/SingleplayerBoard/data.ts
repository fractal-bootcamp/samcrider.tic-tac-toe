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
  const [agentMove, setAgentMove] = useState<number | null>(null);

  const checkWinner = () => {
    possibleWinPositions.forEach((possibleWinPosition) => {
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
          return setGameState({
            ...gameState,
            ties: gameState.ties + 1,
            currentGameFinished: true,
          });
        }
        // just return if board isn't full
        return;
      }

      // if win condition found, set accordingly
      if (currentGameState === TurnEnum.X) {
        return setGameState({
          ...gameState,
          winner: {
            ...gameState.winner,
            playerX: gameState.winner.playerX + 1,
          },
          currentGameFinished: true,
        });
      }

      if (currentGameState === TurnEnum.O) {
        return setGameState({
          ...gameState,
          winner: {
            ...gameState.winner,
            playerO: gameState.winner.playerO + 1,
          },
          currentGameFinished: true,
        });
      }
    });
  };

  function minimax(
    board: Cell[],
    depth: number,
    isMaximizing: boolean,
    memo: Map<string, number>
  ): number {
    const boardKey = board.toString();
    if (memo.has(boardKey)) {
      return memo.get(boardKey)!;
    }

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i].value === null) {
          board[i].value = TurnEnum.O;
          const evaluate = minimax(board, depth + 1, false, memo);
          board[i].value = null;
          maxEval = Math.max(maxEval, evaluate);
        }
      }
      memo.set(boardKey, maxEval);
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i].value === null) {
          board[i].value = TurnEnum.X;
          const evaluate = minimax(board, depth + 1, true, memo);
          board[i].value = null;
          minEval = Math.min(minEval, evaluate);
        }
      }
      memo.set(boardKey, minEval);
      return minEval;
    }
  }

  function bestMove(board: Cell[]): number {
    let bestVal = -Infinity;
    let move = -1;
    const memo = new Map<string, number>();

    for (let i = 0; i < 9; i++) {
      if (board[i].value === null) {
        board[i].value = turn;
        const moveVal = minimax(board, 0, false, memo);
        board[i].value = null;
        if (moveVal > bestVal) {
          move = i;
          bestVal = moveVal;
        }
      }
    }

    return move;
  }

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

  useEffect(() => {
    checkWinner();
  }, [board]);

  const handleClick = (cell: Cell) => {
    if (turn === TurnEnum.O) {
      const boardIndex = bestMove(board);
      const newBoard = board.map((currCell) => {
        if (currCell.id === boardIndex) {
          const newVal = currCell.value ? null : turn;
          if (!newVal) {
            return currCell;
          }
          return { ...currCell, value: newVal };
        }
        return currCell;
      });
      setBoard(newBoard);
      setAgentMove(null);
      setTurn(turn ? TurnEnum.X : TurnEnum.O);
    }
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
    setAgentMove(null);
    setTurn(turn === TurnEnum.X ? TurnEnum.O : TurnEnum.X);
  };

  const handleReset = () => {
    setBoard(defaultBoard);
    setTurn(TurnEnum.X);
    setGameState({ ...gameState, currentGameFinished: false });
  };

  return { handleClick, handleReset, board, gameState };
};
