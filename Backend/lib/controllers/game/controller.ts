import express from "express";

const gameRouter = express.Router();

let games = [
  {
    id: 0,
    board: [],
    currentPlayer: "X",
    player1: "X",
    player2: "O",
    winState: { outcome: null, winner: null },
  },
  {
    id: 1,
    board: [],
    currentPlayer: "X",
    player1: "X",
    player2: "O",
    winState: { outcome: null, winner: null },
  },
  {
    id: 2,
    board: [],
    currentPlayer: "X",
    player1: "X",
    player2: "O",
    winState: { outcome: null, winner: null },
  },
];

gameRouter.get("/", (_req, res) => {
  res.send("meep");
});

gameRouter.get("/game/:id", (req, res) => {
  const id = req.params.id;
  const game = games[id];
  res.json({ game: game });
});

gameRouter.post("/game/:id/move", (req, res) => {
  const id = req.params.id;
  const game = games[id];

  const { index } = req.body;

  if (!game) {
    return res.status(404).send("Game not found");
  }

  const newBoard = game.board;
  const player = game.currentPlayer;
  newBoard[index] = player;
  game.board = newBoard;
  game.currentPlayer = player === "X" ? "O" : "X";

  res.json({ game: game });
});

export default gameRouter;
