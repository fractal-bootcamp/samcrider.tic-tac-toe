import { Dispatch, SetStateAction } from "react";
import { Mode } from "../../pages/Start/types";
import { Player } from "../../../lib/services/game/types";

export type Fields = {
  setMode: Dispatch<SetStateAction<Mode>>;
  setOnlinePlayer: Dispatch<SetStateAction<Player>>;
  onlinePlayer: Player;
};
