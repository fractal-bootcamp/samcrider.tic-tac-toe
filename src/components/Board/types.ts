export enum TurnEnum {
  X = "X",
  O = "O",
}

export type Cell = {
  id: number;
  value: TurnEnum | null;
};

type Winner = {
  playerX: number;
  playerO: number;
};

export type GameState = {
  currentGameFinished: boolean;
  winner: Winner;
  ties: number;
};

export type Fields = {
  board: Cell[];
  gameState: GameState;
  handleReset: () => void;
  handleClick: (cell: Cell) => void;
};
