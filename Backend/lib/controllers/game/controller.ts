import express from "express";
import { Game, Player, Symbol } from "./types";
import { checkWinner } from "../../../utils/checkWinner";

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
    currentPlayer: null,
    playerX: null,
    playerO: null,
    winState: { playerX: 0, playerO: 0, ties: 0, currentGameFinished: false },
  },
];

gameRouter.get("/", (_req, res) => {
  res.status(200).json({ games: games });
});

gameRouter.post("/game/:id", (req, res) => {
  // grab game based on id
  const game = games.find((game) => game.id === req.params.id);
  // game found check
  if (!game) {
    return res.status(404).send("Game not found");
  }

  console.log("g1", game);

  // destructure player from request
  const { player } = req.body;
  console.log(player);
  // assert player type
  const assertedPlayer = player as Player;

  // assign the player to the game
  if (game.playerX) {
    if (game.playerO) {
      return res.status(400).send("Game full");
    }
    game.playerO = assertedPlayer;
    return res.status(200).json({ game: game });
  }
  game.playerX = assertedPlayer;
  // set initial currentPlayer to X
  game.currentPlayer = game.playerX;
  console.log(game);
  res.status(200).json({ game: game });
});

gameRouter.get("/game/:id/reset", (req, res) => {
  const game = games.find((game) => game.id === req.params.id);

  if (!game) {
    return res.status(404).send("Game not found");
  }

  game.board = [
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
  game.winState.currentGameFinished = false;
  game.currentPlayer = game.playerX;

  res.status(200).json({ game: game });
});

gameRouter.post("/game/:id/move", (req, res) => {
  // grab game based on id
  const game = games.find((game) => game.id === req.params.id);
  // game found check
  if (!game) {
    return res.status(404).send("Game not found");
  }

  // destructure index from request body
  const { cell } = req.body;
  // assert index type
  if (typeof cell !== "object") {
    res.status(400).json({ error: "Must select cell on the board" });
    throw new Error("cell is not of type number");
  }

  // grab current player
  const currPlayer = game.currentPlayer;
  if (!currPlayer) {
    return res.status(400).send("no current player!");
  }
  // set board cell to current player symbol
  if (game.board[cell.id].value !== null) {
    return res.status(400).send("Spot taken");
  }
  game.board[cell.id].value = currPlayer.symbol;

  // call check winner
  console.log("about to check winner");

  checkWinner(game);

  if (game.winState.currentGameFinished) {
    return res.status(200).json({ game: game });
  }
  // toggle current player
  game.currentPlayer =
    currPlayer.symbol === Symbol.X ? game.playerO : game.playerX;

  // return updated game
  res.status(200).json({ game: game });
});

export default gameRouter;
