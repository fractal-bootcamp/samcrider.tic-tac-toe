export enum Symbol {
  X = "X",
  O = "O",
}

export type Player = {
  name: string;
  symbol: Symbol;
};

export enum Outcome {
  WIN = "WIN",
  TIE = "TIE",
}

export type Cell = {
  id: number;
  value: Symbol | null;
};

export type Game = {
  id: string;
  name: string;
  board: Cell[];
  currentPlayer: Player;
  playerX: Player;
  playerO: Player;
  winState: {
    outcome: Outcome | null;
    winner: Symbol | null;
  };
};
