import { Dispatch, SetStateAction } from "react";
import { Mode } from "../../pages/Start/types";
import { Game, Player } from "../../../lib/services/game/types";

export type Fields = {
  setMode: Dispatch<SetStateAction<Mode>>;
  games: Game[] | undefined;
  selectedGame: Game | undefined;
  handleJoinGame: (id: string) => void;
  onlinePlayer: Player;
  handleCreateGame: () => Promise<void>;
  gameTitle: string;
  setGameTitle: Dispatch<SetStateAction<string>>;
};

export type LobbyProps = {
  onlinePlayer: Player;
  setMode: Dispatch<SetStateAction<Mode>>;
};
