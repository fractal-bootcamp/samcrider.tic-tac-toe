import { useEffect, useState } from "react";
import type { Difficulty, Mode, Players } from "./types";
import { Player } from "../../../lib/services/game/types";

const defaultMode: Mode = 0;
const defaultPlayers: Players = { playerO: "", playerX: "" };
const defaultOnlinePlayer: Player = { name: "", symbol: null };
const defaultDifficulty = "easy";

export const useStartPageData = () => {
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [players, setPlayers] = useState<Players>(defaultPlayers);
  const [onlinePlayer, setOnlinePlayer] = useState<Player>(defaultOnlinePlayer);
  const [difficulty, setDifficulty] = useState<Difficulty>(defaultDifficulty);

  useEffect(() => {
    if (mode === 0) {
      setPlayers({ playerO: "", playerX: "" });
      setOnlinePlayer({ name: "", symbol: null });
    }
  }, [mode]);

  return {
    mode,
    setMode,
    players,
    setPlayers,
    difficulty,
    setDifficulty,
    onlinePlayer,
    setOnlinePlayer,
  };
};
