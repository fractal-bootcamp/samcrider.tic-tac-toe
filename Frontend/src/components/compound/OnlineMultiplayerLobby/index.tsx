import socket from "../../../lib/services/socket/service";
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
    setSelectedGame,
  } = useLobbyData(onlinePlayer);

  socket.emit("sendMeGames");
  socket.on("newGameList", (_games) => {
    console.log("im in here!");
    // setGames(games);
  });

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
      setSelectedGame={setSelectedGame}
    />
  );
};

export default OnlineMultiplayerLobby;
