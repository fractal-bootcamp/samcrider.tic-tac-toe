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
    // hit backend and remove the player from the game object
    // just return 200 status and then set the mode to 3 to move player back to lobby
    if (!game) return;
    gameService()
      .leaveGame(game.id, onlinePlayer)
      .then(() => {
        setGame(null);
        setSelectedGame(undefined);
      });
  };

  return {
    handleClick,
    handleReset,
    game,
    handleLeaveGame,
  };
};
