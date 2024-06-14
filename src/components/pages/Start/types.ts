import { Dispatch, SetStateAction } from "react";

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

export type OnlinePlayerInputDto = {
  name: string;
};

export type OnlinePlayerOutputDto = {
  id: string;
  name: string;
};

export type OnlinePlayer = OnlinePlayerInputDto | OnlinePlayerOutputDto;

export type Fields = {
  players: Players;
  setPlayers: Dispatch<SetStateAction<Players>>;
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
  setDifficulty: Dispatch<SetStateAction<Difficulty>>;
  difficulty: Difficulty;
  onlinePlayer: OnlinePlayer;
  setOnlinePlayer: Dispatch<SetStateAction<OnlinePlayer>>;
};
