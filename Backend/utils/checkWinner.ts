import type { Game } from "../lib/controllers/game/types";
import { Symbol } from "../lib/controllers/game/types";

export const checkWinner = (game: Game) => {
  const possibleWinPositions: (Symbol | null)[][] = [
    [game.board[0].value, game.board[1].value, game.board[2].value],
    [game.board[3].value, game.board[4].value, game.board[5].value],
    [game.board[6].value, game.board[7].value, game.board[8].value],
    [game.board[0].value, game.board[3].value, game.board[6].value],
    [game.board[1].value, game.board[4].value, game.board[7].value],
    [game.board[2].value, game.board[5].value, game.board[8].value],
    [game.board[0].value, game.board[4].value, game.board[8].value],
    [game.board[2].value, game.board[4].value, game.board[6].value],
  ];

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

    // if the game is finished, we need to skip the rest of the possible win positions and return
    if (game.winState.currentGameFinished) {
      return;
    }

    // there is no win condition
    if (!currentGameState) {
      // if the board is full
      if (!game.board.find((cell) => !cell.value)) {
        game.winState.currentGameFinished = true;
        game.winState.ties++;
        return;
      }
      // just return if board isn't full
      return;
    }

    // if win condition found, set accordingly
    if (currentGameState === Symbol.X) {
      game.winState.currentGameFinished = true;
      game.winState.playerX++;
      return;
    }

    if (currentGameState === Symbol.O) {
      game.winState.currentGameFinished = true;
      game.winState.playerO++;
      return;
    }
  });
};
