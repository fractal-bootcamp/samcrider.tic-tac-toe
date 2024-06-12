import { SetStateAction } from "react";
import { Players, Mode, Difficulty } from "../../pages/Start/types";

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
  setMode: React.Dispatch<SetStateAction<Mode>>;
  players: Players;
};

export type BoardProps = {
  players: Players;
  setMode: React.Dispatch<SetStateAction<Mode>>;
  difficulty: Difficulty;
};
