import { useEffect, useState } from "react";
import { Cell, Game, Player, Symbol } from "../../../lib/services/game/types";
import { GameState } from "../MultiplayerBoard/types";
import { gameService } from "../../../lib/services/game/service";

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

export const useBoardData = (gameId: string, player: Player) => {
  const [board, setBoard] = useState<Cell[]>(defaultBoard);
  const [turn, setTurn] = useState<Symbol>(Symbol.X);
  const [gameState, setGameState] = useState<GameState>(defaultGameState);
  const [players, setPlayers] = useState<Player[]>([]);
  const [game, setGame] = useState<Game | undefined>(undefined);

  const getGame = async () => {
    try {
      const data = await gameService().getGame(gameId);
      const game = data.game as Game;
      setGame(game);
    } catch (e) {
      console.error(e);
    }
  };

  console.log("before effect");

  useEffect(() => {
    console.log("in effect");

    setPlayers([...players, player]);

    getGame();
  }, []);

  const possibleWinPositions: (Symbol | null)[][] = [
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
      if (currentGameState === Symbol.X) {
        return setGameState({
          ...gameState,
          winner: {
            ...gameState.winner,
            playerX: gameState.winner.playerX + 1,
          },
          currentGameFinished: true,
        });
      }

      if (currentGameState === Symbol.O) {
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
    setTurn(turn === "X" ? Symbol.O : Symbol.X);
  };

  const handleReset = () => {
    setBoard(defaultBoard);
    setTurn(Symbol.X);
    setGameState({ ...gameState, currentGameFinished: false });
  };

  return {
    handleClick,
    handleReset,
    board,
    gameState,
    players,
    setPlayers,
    game,
  };
};
