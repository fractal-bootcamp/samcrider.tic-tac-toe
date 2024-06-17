// lobby data

import { useEffect, useState } from "react";
import { gameService } from "../../../lib/services/game/service";
import type { Game, Player } from "../../../lib/services/game/types";

export const useLobbyData = (onlinePlayer: Player) => {
  const [games, setGames] = useState<Game[] | undefined>(undefined);
  const [selectedGame, setSelectedGame] = useState<Game | undefined>(undefined);
  const [gameTitle, setGameTitle] = useState<string>("");

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
    console.log("about to await game service");

    console.log(gameTitle);
    console.log(onlinePlayer);

    const data = await gameService().createGame(onlinePlayer, gameTitle);
    console.log(data.game);

    setSelectedGame(data.game);
  };

  useEffect(() => {
    getAllGames();
  }, []);

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
