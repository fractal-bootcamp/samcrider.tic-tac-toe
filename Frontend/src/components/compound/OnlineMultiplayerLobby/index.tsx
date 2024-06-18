import Component from "./component";
import { useLobbyData } from "./data";
import { LobbyProps } from "./types";
import { Socket, io } from "socket.io-client";

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

  // create socket and useEffect to update gamelist state
  const socket: Socket = io("http://localhost:5173", {
    transports: ["websocket"],
  });
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
