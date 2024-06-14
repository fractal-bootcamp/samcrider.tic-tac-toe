import { SetStateAction } from "react";
import { Mode, OnlinePlayer } from "../../pages/Start/types";

export type Fields = {
  setMode: React.Dispatch<SetStateAction<Mode>>;
  onlinePlayer: OnlinePlayer;
};

export type BoardProps = {
  onlinePlayer: OnlinePlayer;
  setMode: React.Dispatch<SetStateAction<Mode>>;
};
