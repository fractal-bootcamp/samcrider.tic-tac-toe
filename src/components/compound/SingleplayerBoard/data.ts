import { useEffect, useState } from "react";
import { Cell, GameState, TurnEnum } from "./types";

const defaultGameState: GameState = {
  currentGameFinished: false,
  mostRecentWinner: null,
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
  const [score, setScore] = useState<number>(0);

  const checkWinner = () => {
    console.log("Check Winner");

    setGameState({ ...gameState, mostRecentWinner: null });

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
        if (board.every((cell) => cell.value !== null)) {
          console.log("board in full board check", board);

          console.log("board is apparently full...");

          return setGameState({
            ...gameState,
            ties: gameState.ties + 1,
            currentGameFinished: true,
            mostRecentWinner: null,
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
          mostRecentWinner: "playerX",
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
          mostRecentWinner: "playerO",
        });
      }
    });
  };

  const miniMaxCheckWinner = () => {
    let projected;
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
      projected = currentGameState;
    });
    return projected;
  };

  // Minimax algorithm
  const miniMax = (board: Cell[], isMaximizing: boolean): number => {
    const currentProjectedWinner = miniMaxCheckWinner();
    if (currentProjectedWinner === TurnEnum.O) {
      setScore(-1);
    } else if (currentProjectedWinner === TurnEnum.X) {
      setScore(1);
    } else if (board.every((cell) => cell.value !== null)) {
      setScore(0);
    }

    let moves = [];
    for (let i = 0; i < 9; i++) {
      if (board[i].value === null) {
        let move: { index: number; value: number } = {
          index: board[i].id,
          value: 0,
        };

        board[i].value = isMaximizing ? TurnEnum.O : TurnEnum.X;

        miniMax(board, !isMaximizing);
        move.value = score;

        board[i].value = null;

        moves.push(move);
      }
    }

    let bestMove = -1;
    isMaximizing
      ? moves.forEach((move) => {
          let bestScore = -Infinity;

          if (move.value > bestScore) {
            bestScore = move.value;
            bestMove = move.index;
          }
        })
      : moves.forEach((move) => {
          let bestScore = Infinity;
          if (move.value < bestScore) {
            bestScore = move.value;
            bestMove = move.index;
          }
        });

    return bestMove;
  };

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
    console.log(gameState);

    checkWinner();
  }, [board]);

  useEffect(() => {
    console.log("whose turn?", turn);
    if (turn === TurnEnum.O) {
      console.log("Agent turn starting");

      const boardIndex = miniMax(board, true);
      console.log("best spot (button index) for agent", boardIndex);

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
      setTurn(turn ? TurnEnum.X : TurnEnum.O);
    }
  }, [turn]);

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
    setTurn(turn === TurnEnum.X ? TurnEnum.O : TurnEnum.X);
  };

  const handleReset = () => {
    setBoard(defaultBoard);
    setTurn(TurnEnum.X);
    setGameState({ ...gameState, currentGameFinished: false });
  };

  return { handleClick, handleReset, board, gameState };
};
