import { Dispatch, SetStateAction } from "react";
import { Mode } from "../../pages/Start/types";
import { Cell, Player } from "../../../lib/services/game/types";
import { GameState } from "../MultiplayerBoard/types";
import { JoinState } from "../OnlineMultiplayerLobby/types";

export type Fields = {
  board: Cell[];
  gameState: GameState;
  handleReset: () => void;
  handleClick: (cell: Cell) => void;
  setMode: Dispatch<SetStateAction<Mode>>;
  players: Player[];
};

export type OnlineBoardProps = {
  player: Player;
  setMode: Dispatch<SetStateAction<Mode>>;
  gameId: string;
  setJoined: Dispatch<SetStateAction<JoinState>>;
};
