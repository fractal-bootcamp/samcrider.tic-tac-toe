import express from "express";
import { Game, Symbol } from "./types";

const gameRouter = express.Router();

// default game list
let games: Game[] = [
  {
    id: "0",
    name: "Admin's Game",
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
    currentPlayer: { name: "sam", symbol: Symbol.X },
    playerX: { name: "sam", symbol: Symbol.X },
    playerO: { name: "jake", symbol: Symbol.O },
    winState: { outcome: null, winner: null },
  },
];

gameRouter.get("/", (_req, res) => {
  res.status(200).json({ games: games });
});

gameRouter.get("/game/:id", (req, res) => {
  // grab game based on id
  const game = games.find((game) => game.id === req.params.id);
  // game found check
  if (!game) {
    return res.status(404).send("Game not found");
  }
  // if found, send it to client
  res.json({ game: game });
});

gameRouter.post("/game/:id/move", (req, res) => {
  // grab game based on id
  const game = games.find((game) => game.id === req.params.id);
  // game found check
  if (!game) {
    return res.status(404).send("Game not found");
  }

  // destructure index from request body
  const { index } = req.body;
  // assert index type
  if (typeof index !== "number") {
    res.status(400).json({ error: "Must select cell on the board" });
    throw new Error("index is not of type number");
  }

  // grab current player
  const currPlayer = game.currentPlayer;
  // set board cell to current player symbol
  game.board[index].value = currPlayer.symbol;
  // toggle current player
  game.currentPlayer =
    currPlayer.symbol === Symbol.X ? game.playerO : game.playerX;

  // return updated game
  res.status(200).json({ game: game });
});

export default gameRouter;
