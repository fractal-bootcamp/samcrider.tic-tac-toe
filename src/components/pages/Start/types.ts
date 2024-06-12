enum ModeEnum {
  STARTPAGE = 0,
  SINGLEPLAYER = 1,
  MULTIPLAYER = 2,
}

export type Mode = ModeEnum | null;

export type Difficulty = "easy" | "hard";

export type Players = {
  playerX: string;
  playerO: string;
};

export type Fields = {
  players: Players;
  setPlayers: React.Dispatch<React.SetStateAction<Players>>;
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  setDifficulty: React.Dispatch<React.SetStateAction<Difficulty>>;
  difficulty: Difficulty;
};
