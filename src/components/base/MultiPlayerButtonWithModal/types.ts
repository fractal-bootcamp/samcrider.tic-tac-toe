import { Dispatch, SetStateAction } from "react";
import { Mode, Players } from "../../pages/Start/types";

export type Fields = {
  players: Players;
  setPlayers: Dispatch<SetStateAction<Players>>;
  setMode: Dispatch<SetStateAction<Mode>>;
};
