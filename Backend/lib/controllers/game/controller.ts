import express from "express";
import { Game, Player, Symbol } from "./types";
import { checkWinner } from "../../../utils/checkWinner";
import client from "../../../utils/client";
import { JsonObject } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";
import { io } from "../../..";

const gameRouter = express.Router();

gameRouter.get("/", async (_req, res) => {
  // get all the games and return them
  const games = await client.game.findMany();
  res.status(200).json({ games: games });
});

gameRouter.delete("/remove", async (_req, res) => {
  try {
    // if a game has no players, delete it
    await client.game.deleteMany({
      where: {
        playerO: { equals: Prisma.JsonNull },
        playerX: { equals: Prisma.JsonNull },
      },
    });
    // web socket
    const games = await client.game.findMany();
    console.log(games);

    io.emit("game_get_all_event", JSON.stringify(games));

    return res
      .status(200)
      .json({ message: "empty games successfully deleted" });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: "failed to delete games" });
  }
});

gameRouter.get("/game/:id", async (req, res) => {
  try {
    // get game by id
    const game = await client.game.findUnique({
      where: {
        id: req.params.id,
      },
    });
    // return it
    res.status(200).json({ game: game });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: "game not found" });
  }
});

gameRouter.post("/game/:id", async (req, res) => {
  try {
    // get game by id
    const game = await client.game.findUnique({
      where: {
        id: req.params.id,
      },
    });
    // if not found, return
    if (!game) {
      return res.status(400).json({ error: "game not found" });
    }

    // destructure player from request
    const { player } = req.body;
    // assert player type
    const assertedPlayer = player as Player;

    if (game.playerX) {
      if (game.playerO) {
        // if both players in game, game is full
        return res.status(400).json({ error: "Game full" });
      }
      // if player x in game but not player o, add player o
      const updatedGame = await client.game.update({
        where: {
          id: req.params.id,
        },
        data: {
          playerO: {
            name: assertedPlayer.name,
            symbol: Symbol.O,
          } as JsonObject,
        },
      });
      // web socket
      io.emit("game_join_event", JSON.stringify(updatedGame));

      return res.status(200).json({ game: updatedGame });
    }
    // if no player x, add player x
    const updatedGame = await client.game.update({
      where: {
        id: req.params.id,
      },
      data: {
        playerX: { name: assertedPlayer.name, symbol: Symbol.X } as JsonObject,
      },
    });
    // web socket
    io.emit("game_join_event", JSON.stringify(updatedGame));

    // return game
    return res.status(200).json({ game: updatedGame });
  } catch (e) {
    console.error(e);
    return res
      .status(400)
      .json({ error: "possible errors: finding game, updating player x/o" });
  }
});

gameRouter.post("/create", async (req, res) => {
  // destructure player and game title from request
  const { player, gameTitle } = req.body;
  // assert player type
  const assertedPlayer = player as Player;
  const assertedGameTitle = gameTitle as string;

  try {
    // try to create new game
    const newGame = await client.game.create({
      data: {
        name: assertedGameTitle,
        board: [
          { id: 0, value: null },
          { id: 1, value: null },
          { id: 2, value: null },
          { id: 3, value: null },
          { id: 4, value: null },
          { id: 5, value: null },
          { id: 6, value: null },
          { id: 7, value: null },
          { id: 8, value: null },
        ],
        currentPlayer: {
          name: assertedPlayer.name,
          symbol: Symbol.X,
        } as JsonObject,
        playerX: { name: assertedPlayer.name, symbol: Symbol.X } as JsonObject,
        playerO: Prisma.JsonNull,
        winState: {
          playerX: 0,
          playerO: 0,
          ties: 0,
          currentGameFinished: false,
        } as JsonObject,
      },
    });

    // web socket
    const games = await client.game.findMany();
    io.emit("game_get_all_event", JSON.stringify(games));

    return res.status(201).json({ game: newGame });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: "Couldn't create game" });
  }
});

gameRouter.get("/game/:id/reset", async (req, res) => {
  try {
    // try to grab the current game
    const game = await client.game.findUnique({
      where: {
        id: req.params.id,
      },
    });
    // if not found, error
    if (!game) {
      return res.status(400).json({ error: "game not found" });
    }

    // try to reset the game board
    const updatedGame = await client.game.update({
      where: {
        id: req.params.id,
      },
      data: {
        board: [
          { id: 0, value: null },
          { id: 1, value: null },
          { id: 2, value: null },
          { id: 3, value: null },
          { id: 4, value: null },
          { id: 5, value: null },
          { id: 6, value: null },
          { id: 7, value: null },
          { id: 8, value: null },
        ],
        winState: {
          ...(game.winState as JsonObject),
          currentGameFinished: false,
        },
        currentPlayer: game.playerX as JsonObject,
      },
    });
    // web socket
    io.emit("game_reset_event", JSON.stringify(updatedGame));

    // return the updated game
    return res.status(200).json({ game: updatedGame });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: "game couldn't be reset" });
  }
});

gameRouter.post("/game/:id/leave", async (req, res) => {
  try {
    // destructure player trying to leave
    const { player } = req.body;
    // grab game based on id
    const game = await client.game.findUnique({
      where: {
        id: req.params.id,
      },
    });
    // game found check
    if (!game) {
      return res.status(400).json({ error: "game not found" });
    }

    // assert players from the database
    const playerO = game.playerO as JsonObject;
    const playerX = game.playerX as JsonObject;

    // if player O is trying to leave

    if (playerO && playerO.name === player.name) {
      // remove them from game
      const updatedGame = await client.game.update({
        where: {
          id: req.params.id,
        },
        data: {
          playerO: Prisma.JsonNull,
        },
      });
      // web socket
      io.emit("game_leave_event", JSON.stringify(updatedGame));

      return res.status(200).json({ message: "player left game" });
    }
    // if player X is trying to leave
    if (playerX && playerX.name === player.name) {
      // remove them from the game
      const updatedGame = await client.game.update({
        where: {
          id: req.params.id,
        },
        data: {
          playerX: Prisma.JsonNull,
        },
      });
      // web socket
      io.emit("game_leave_event", JSON.stringify(updatedGame));

      return res.status(200).json({ message: "player left game" });
    }
    // if neither player is trying to leave, something bad happened...
    return res.status(400).json("player couldn't be removed from the game");
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: "couldn't remove player from game" });
  }
});

gameRouter.post("/game/:id/move", async (req, res) => {
  try {
    // grab game based on id
    const game = await client.game.findUnique({
      where: {
        id: req.params.id,
      },
    });
    // game found check
    if (!game) {
      return res.status(400).json({ error: "game not found" });
    }

    // destructure cell from request body
    const { cell } = req.body;
    // assert cell type
    if (typeof cell !== "object") {
      res.status(400).json({ error: "Must select cell on the board" });
      throw new Error("cell is not of type object");
    }

    // assert board and current player
    const board = game.board as JsonObject[];
    const currentPlayer = game.currentPlayer as JsonObject;
    // set board cell to current player symbol
    if (board[cell.id].value !== null) {
      return res.status(400).json({ error: "Spot taken" });
    }

    const updatedBoard = board.map((b) => {
      if (b.id === cell.id) {
        return { id: cell.id, value: currentPlayer.symbol };
      }
      return b;
    });

    const updatedGame: JsonObject = await client.game.update({
      where: {
        id: req.params.id,
      },
      data: {
        board: updatedBoard,
      },
    });

    // call check winner, assert game
    checkWinner(updatedGame as Game);

    // grab the potentially updated game
    const potentiallyUpdatedGame: JsonObject | null =
      await client.game.findUnique({
        where: {
          id: req.params.id,
        },
      });
    if (!potentiallyUpdatedGame) {
      return res.status(400).json({ error: "game not found" });
    }

    // assert the winState
    const winState = potentiallyUpdatedGame.winState as JsonObject;

    // if the game is finished, return
    if (winState.currentGameFinished) {
      // web socket
      io.emit("game_move_event", JSON.stringify(potentiallyUpdatedGame));

      return res.status(200).json({ game: potentiallyUpdatedGame });
    } else {
      // else, toggle current player
      const gameAfterToggleTurn =
        currentPlayer.symbol === Symbol.X
          ? await client.game.update({
              where: {
                id: req.params.id,
              },
              data: {
                currentPlayer: potentiallyUpdatedGame.playerO as JsonObject,
              },
            })
          : await client.game.update({
              where: {
                id: req.params.id,
              },
              data: {
                currentPlayer: potentiallyUpdatedGame.playerX as JsonObject,
              },
            });
      // return toggled game
      // web socket
      io.emit("game_move_event", JSON.stringify(gameAfterToggleTurn));

      res.status(200).json({ game: gameAfterToggleTurn });
    }
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: "Current move couldn't be made" });
  }
});

export default gameRouter;
