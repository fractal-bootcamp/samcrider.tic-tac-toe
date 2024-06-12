enum ModeEnum {
  SINGLEPLAYER = 1,
  MULTIPLAYER = 2,
}

export type Mode = ModeEnum | null;

export type Fields = {
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
};
