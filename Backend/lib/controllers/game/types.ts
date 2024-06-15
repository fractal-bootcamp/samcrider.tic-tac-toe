export enum Symbol {
  X = "X",
  O = "O",
}

export type Player = {
  name: string;
  symbol: Symbol | null;
};

export type Cell = {
  id: number;
  value: Symbol | null;
};

export type Game = {
  id: string;
  name: string;
  board: Cell[];
  currentPlayer: Player | null;
  playerX: Player | null;
  playerO: Player | null;
  winState: {
    playerX: number;
    playerO: number;
    ties: number;
    currentGameFinished: boolean;
  };
};
