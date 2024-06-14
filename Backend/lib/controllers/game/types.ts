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
  // change this to only string once db connected
  id: string | number;
  board: Cell[];
  currentPlayer: Player;
  playerX: Player;
  playerO: Player;
  winState: {
    outcome: Outcome | null;
    winner: Symbol | null;
  };
};
