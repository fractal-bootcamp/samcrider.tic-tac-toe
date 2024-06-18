import { JsonObject } from "@prisma/client/runtime/library";
import type { Game } from "../lib/controllers/game/types";
import { Symbol } from "../lib/controllers/game/types";
import client from "./client";

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

  // with every() you can break out by returning falsy
  possibleWinPositions.every(async (possibleWinPosition) => {
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
      if (!game.board.find((cell) => !cell.value)) {
        await client.game.update({
          where: {
            id: game.id,
          },
          data: {
            winState: {
              ...game.winState,
              currentGameFinished: true,
              ties: game.winState.ties + 1,
            },
          },
        });
        return false;
      }
      // just return if board isn't full
      return true;
    }

    // if win condition found, set accordingly
    if (currentGameState === Symbol.X) {
      await client.game.update({
        where: {
          id: game.id,
        },
        data: {
          winState: {
            ...game.winState,
            currentGameFinished: true,
            playerX: game.winState.playerX + 1,
          },
        },
      });
      return false;
    }

    if (currentGameState === Symbol.O) {
      await client.game.update({
        where: {
          id: game.id,
        },
        data: {
          winState: {
            ...game.winState,
            currentGameFinished: true,
            playerO: game.winState.playerO + 1,
          },
        },
      });
      return false;
    }

    return true;
  });
};
