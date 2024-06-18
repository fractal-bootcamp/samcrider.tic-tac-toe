// lobby data

import { useEffect, useState } from "react";
import { gameService } from "../../../lib/services/game/service";
import type { Game, Player } from "../../../lib/services/game/types";

export const useLobbyData = (onlinePlayer: Player) => {
  const [games, setGames] = useState<Game[] | undefined>(undefined);
  const [selectedGame, setSelectedGame] = useState<Game | undefined>(undefined);
  const [gameTitle, setGameTitle] = useState<string>("");
  const [poller, setPoller] = useState<number>(0);

  const getAllGames = async () => {
    try {
      const data = await gameService().getAllGames();
      const allGames = data.games as Game[];
      setGames(allGames);
    } catch (e) {
      console.error(e);
    }
  };

  const handleJoinGame = async (id: string) => {
    const data = await gameService().getGame(id, onlinePlayer);
    setSelectedGame(data.game);
  };

  const handleCreateGame = async () => {
    const data = await gameService().createGame(onlinePlayer, gameTitle);

    setSelectedGame(data.game);
  };

  useEffect(() => {
    getAllGames();

    setTimeout(() => setPoller(poller + 1), 1000);
  });

  return {
    games,
    handleJoinGame,
    selectedGame,
    handleCreateGame,
    gameTitle,
    setGameTitle,
    setSelectedGame,
  };
};
