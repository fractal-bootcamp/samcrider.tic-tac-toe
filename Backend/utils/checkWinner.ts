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

  possibleWinPositions.forEach(async (possibleWinPosition) => {
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
    // grab game
    const potentiallyUpdatedGame: JsonObject | null =
      await client.game.findUnique({
        where: {
          id: game.id,
        },
      });
    // if error grabbing game, throw an error
    if (!potentiallyUpdatedGame) {
      throw new Error("couldn't find game");
    }
    // assert the winState
    const winState = potentiallyUpdatedGame.winState as JsonObject;
    // if the game is finished, return
    if (winState.currentGameFinished) {
      return;
    }

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
              currentGameFinished: true,
              ties: game.winState.ties + 1,
            },
          },
        });
        return;
      }
      // just return if board isn't full
      return;
    }

    // if win condition found, set accordingly
    if (currentGameState === Symbol.X) {
      await client.game.update({
        where: {
          id: game.id,
        },
        data: {
          winState: {
            currentGameFinished: true,
            playerX: game.winState.playerX + 1,
          },
        },
      });
      return;
    }

    if (currentGameState === Symbol.O) {
      await client.game.update({
        where: {
          id: game.id,
        },
        data: {
          winState: {
            currentGameFinished: true,
            playerO: game.winState.playerO + 1,
          },
        },
      });
      return;
    }
  });
};
