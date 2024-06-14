import React from "react";
import Component from "./component";
import { BoardProps } from "./types";

const OnlineMultiplayerLobby = ({ onlinePlayer, setMode }: BoardProps) => {
  return <Component setMode={setMode} onlinePlayer={onlinePlayer} />;
};

export default OnlineMultiplayerLobby;
