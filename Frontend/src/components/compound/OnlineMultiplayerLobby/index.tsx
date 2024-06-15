import Component from "./component";
import { useLobbyData } from "./data";
import { LobbyProps } from "./types";

const OnlineMultiplayerLobby = ({ onlinePlayer, setMode }: LobbyProps) => {
  const {
    games,
    handleJoinGame,
    selectedGame,
    handleCreateGame,
    gameTitle,
    setGameTitle,
  } = useLobbyData(onlinePlayer);
  return (
    <Component
      setMode={setMode}
      games={games}
      selectedGame={selectedGame}
      handleJoinGame={handleJoinGame}
      onlinePlayer={onlinePlayer}
      handleCreateGame={handleCreateGame}
      gameTitle={gameTitle}
      setGameTitle={setGameTitle}
    />
  );
};

export default OnlineMultiplayerLobby;
