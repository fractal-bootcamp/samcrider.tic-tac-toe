import { Dispatch, SetStateAction } from "react";
import { Player } from "../../../lib/services/game/types";

enum ModeEnum {
  STARTPAGE = 0,
  SINGLEPLAYER = 1,
  MULTIPLAYER = 2,
  ONLINE_MULTIPLAYER = 3,
}

export type Mode = ModeEnum | null;

export type Difficulty = "easy" | "hard";

export type Players = {
  playerX: string;
  playerO: string;
};

export type Fields = {
  players: Players;
  setPlayers: Dispatch<SetStateAction<Players>>;
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
  setDifficulty: Dispatch<SetStateAction<Difficulty>>;
  difficulty: Difficulty;
  onlinePlayer: Player;
  setOnlinePlayer: Dispatch<SetStateAction<Player>>;
};
