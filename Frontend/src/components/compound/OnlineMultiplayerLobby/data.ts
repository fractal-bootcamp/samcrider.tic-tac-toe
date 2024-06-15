// lobby data

import { useEffect, useState } from "react";
import { gameService } from "../../../lib/services/game/service";
import type { Game } from "../../../lib/services/game/types";
import { JoinState } from "./types";

export const useLobbyData = () => {
  const [games, setGames] = useState<Game[] | undefined>(undefined);
  const [joined, setJoined] = useState<JoinState>({
    joined: false,
    gameId: null,
  });

  const getAllGames = async () => {
    try {
      const data = await gameService().getAllGames();
      const allGames = data.games as Game[];
      setGames(allGames);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAllGames();
  }, []);

  return { games, joined, setJoined };
};
