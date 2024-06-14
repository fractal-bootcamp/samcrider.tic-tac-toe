import Component from "./component";
import { useLobbyData } from "./data";
import { LobbyProps } from "./types";

const OnlineMultiplayerLobby = ({ onlinePlayer, setMode }: LobbyProps) => {
  const { games, joined, setJoined } = useLobbyData();
  return (
    <Component
      setMode={setMode}
      onlinePlayer={onlinePlayer}
      games={games}
      joined={joined}
      setJoined={setJoined}
    />
  );
};

export default OnlineMultiplayerLobby;
