// lobby data

import { useEffect, useState } from "react";
import { gameService } from "../../../lib/services/game/service";
import type { Game, Player } from "../../../lib/services/game/types";

export const useLobbyData = (onlinePlayer: Player) => {
  const [games, setGames] = useState<Game[] | undefined>(undefined);
  const [selectedGame, setSelectedGame] = useState<Game | undefined>(undefined);

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

  useEffect(() => {
    getAllGames();
  }, []);

  return { games, handleJoinGame, selectedGame };
};
