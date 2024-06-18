import { Cell, Game, Player } from "../../../lib/services/game/types";
import { gameService } from "../../../lib/services/game/service";
import { Dispatch, SetStateAction, useState } from "react";
import socket from "../../../lib/services/socket/service";

export const useBoardData = (
  selectedGame: Game,
  onlinePlayer: Player,
  setSelectedGame: Dispatch<SetStateAction<Game | undefined>>
) => {
  const [game, setGame] = useState<Game | null>(selectedGame);

  // web sockets

  socket.on("game_move_event", (message) => {
    setGame(JSON.parse(message));
  });

  socket.on("game_join_event", (message) => {
    setGame(JSON.parse(message));
  });

  socket.on("game_reset_event", (message) => {
    setGame(JSON.parse(message));
  });

  socket.on("game_leave_event", (message) => {
    setGame(JSON.parse(message));
  });

  const handleClick = async (cell: Cell) => {
    if (!game) return;

    if (game.currentPlayer?.name === onlinePlayer.name) {
      const data = await gameService().makeGameMove(cell, game.id);
      setGame(data.game);
    }
  };

  const handleReset = async () => {
    // call to backend to clear board and set current player to X, also set current game finished to false
    if (!game) return;
    const data = await gameService().resetGameBoard(game.id);
    setGame(data.game);
  };

  // NOTE: the game needs to be unplayable without two players
  const handleLeaveGame = async () => {
    if (!game) return;

    await gameService().leaveGame(game.id, onlinePlayer);
    // since player is going back to lobby, remove any empty games from the lobby
    await gameService().removeEmptyGames();

    // set game to null and
    setGame(null);
    // move player back to lobby by setting selected game to undefined
    setSelectedGame(undefined);
  };

  return {
    handleClick,
    handleReset,
    game,
    handleLeaveGame,
  };
};
