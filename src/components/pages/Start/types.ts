enum ModeEnum {
  STARTPAGE = 0,
  SINGLEPLAYER = 1,
  MULTIPLAYER = 2,
}

export type Mode = ModeEnum | null;

export type Players = {
  playerX: string;
  playerO: string;
};

export type Fields = {
  players: Players;
  setPlayers: React.Dispatch<React.SetStateAction<Players>>;
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
};
