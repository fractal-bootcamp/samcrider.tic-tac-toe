import { Dispatch, SetStateAction } from "react";
import { Difficulty, Mode, Players } from "../../pages/Start/types";

export type Fields = {
  players: Players;
  setPlayers: Dispatch<SetStateAction<Players>>;
  difficulty: Difficulty;
  setDifficulty: Dispatch<SetStateAction<Difficulty>>;
  setMode: Dispatch<SetStateAction<Mode>>;
};
