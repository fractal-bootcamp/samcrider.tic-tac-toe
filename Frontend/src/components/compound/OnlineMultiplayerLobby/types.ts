import { Dispatch, SetStateAction } from "react";
import { Mode } from "../../pages/Start/types";
import { Game, Player } from "../../../lib/services/game/types";

export type Fields = {
  setMode: Dispatch<SetStateAction<Mode>>;
  onlinePlayer: Player;
  games: Game[] | undefined;
  joined: JoinState;
  setJoined: Dispatch<SetStateAction<JoinState>>;
};

export type LobbyProps = {
  onlinePlayer: Player;
  setMode: Dispatch<SetStateAction<Mode>>;
};

export type JoinState = {
  joined: boolean;
  gameId: string | null;
};
