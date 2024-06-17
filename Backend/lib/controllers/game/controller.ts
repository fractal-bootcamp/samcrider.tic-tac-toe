import express from "express";
import { Game, Player, Symbol } from "./types";
import { checkWinner } from "../../../utils/checkWinner";

const gameRouter = express.Router();

// default game list
let games: Game[] = [
  {
    id: "1",
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
  games.forEach((game) => {
    // if both players left the game, remove it
    if (!game.playerX && !game.playerO) {
      console.log("no players, about to remove game");

      const filteredGames = games.filter((g) => g.id !== game.id);
      games = filteredGames;
      console.log("game was removed");
    }
  });
  res.status(200).json({ games: games });
});

gameRouter.get("/game/:id", (req, res) => {
  // grab game based on id
  const game = games.find((game) => game.id === req.params.id);
  // game found check
  if (!game) {
    return res.status(400).json({ error: "game not found" });
  }
  res.status(200).json({ game: game });
});

gameRouter.post("/game/:id", (req, res) => {
  // grab game based on id
  const game = games.find((game) => game.id === req.params.id);
  // game found check
  if (!game) {
    return res.status(400).json({ error: "game not found" });
  }

  // destructure player from request
  const { player } = req.body;
  // assert player type
  const assertedPlayer = player as Player;

  // assign the player to the game
  if (game.playerX) {
    if (game.playerO) {
      return res.status(400).json({ error: "Game full" });
    }
    game.playerO = assertedPlayer;
    // assign the player's symbol
    game.playerO.symbol = Symbol.O;
    return res.status(200).json({ game: game });
  }
  game.playerX = assertedPlayer;
  // assign the player's symbol
  game.playerX.symbol = Symbol.X;
  // set initial currentPlayer to X
  game.currentPlayer = game.playerX;
  res.status(200).json({ game: game });
});

gameRouter.post("/create", (req, res) => {
  // destructure player and game title from request
  const { player, gameTitle } = req.body;
  // assert player type
  const assertedPlayer = player as Player;
  const assertedGameTitle = gameTitle as string;

  // build new game
  const newGame = {
    id: String(games.length + 1),
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
    currentPlayer: assertedPlayer,
    playerX: assertedPlayer,
    playerO: null,
    winState: { playerX: 0, playerO: 0, ties: 0, currentGameFinished: false },
  };

  newGame.currentPlayer.symbol = Symbol.X;
  newGame.playerX.symbol = Symbol.X;

  // add new game to games list
  games.push(newGame);

  // search for new game in games list
  const game = games.find((game) => game.id === newGame.id);
  if (!game) {
    return res.status(400).json({ error: "Failed to create new game" });
  }

  res.status(201).json({ game: game });
});

gameRouter.get("/game/:id/reset", (req, res) => {
  const game = games.find((game) => game.id === req.params.id);

  if (!game) {
    return res.status(400).json({ error: "game not found" });
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

gameRouter.post("/game/:id/leave", (req, res) => {
  const { player } = req.body;
  // grab game based on id
  const game = games.find((game) => game.id === req.params.id);
  // game found check
  if (!game) {
    return res.status(400).json({ error: "game not found" });
  }

  if (game.playerO?.name === player.name) {
    game.playerO = null;
    return res.status(200).json({ message: "player left game" });
  }
  if (game.playerX?.name === player.name) {
    game.playerX = null;
    return res.status(200).json({ message: "player left game" });
  }
  return res.status(400).json("player couldn't be removed from the game");
});

gameRouter.post("/game/:id/move", (req, res) => {
  // grab game based on id
  const game = games.find((game) => game.id === req.params.id);
  // game found check
  if (!game) {
    return res.status(400).json({ error: "game not found" });
  }

  // destructure cell from request body
  const { cell } = req.body;
  // assert cell type
  if (typeof cell !== "object") {
    res.status(400).json({ error: "Must select cell on the board" });
    throw new Error("cell is not of type number");
  }

  // grab current player
  const currPlayer = game.currentPlayer;
  if (!currPlayer) {
    return res.status(400).json({ error: "no current player!" });
  }
  console.log("game board before move", game.board);

  // set board cell to current player symbol
  if (game.board[cell.id].value !== null) {
    return res.status(400).json({ error: "Spot taken" });
  }
  console.log("current player", currPlayer);

  game.board[cell.id].value = currPlayer.symbol;
  console.log("game board after move", game.board);

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
