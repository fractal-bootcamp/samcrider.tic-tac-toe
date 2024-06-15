import { Dispatch, SetStateAction } from "react";
import { Mode } from "../../pages/Start/types";
import { Cell, Game, Player } from "../../../lib/services/game/types";

export type Fields = {
  game: Game;
  handleReset: (id: string) => void;
  handleClick: (cell: Cell) => void;
  setMode: Dispatch<SetStateAction<Mode>>;
};

export type OnlineBoardProps = {
  setMode: Dispatch<SetStateAction<Mode>>;
  selectedGame: Game;
  onlinePlayer: Player;
};
