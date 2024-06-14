import { Dispatch, SetStateAction } from "react";
import { Mode, OnlinePlayerInputDto } from "../../pages/Start/types";

export type Fields = {
  setMode: Dispatch<SetStateAction<Mode>>;
  setOnlinePlayer: Dispatch<SetStateAction<OnlinePlayerInputDto>>;
  onlinePlayer: OnlinePlayerInputDto;
};
