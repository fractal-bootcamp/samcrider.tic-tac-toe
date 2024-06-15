import { useEffect, useState } from "react";
import { Difficulty, Mode, OnlinePlayer, Players } from "./types";

const defaultMode: Mode = 0;
const defaultPlayers: Players = { playerO: "", playerX: "" };
const defaultOnlinePlayer: OnlinePlayer = { name: "" };
const defaultDifficulty = "easy";

export const useStartPageData = () => {
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [players, setPlayers] = useState<Players>(defaultPlayers);
  const [onlinePlayer, setOnlinePlayer] =
    useState<OnlinePlayer>(defaultOnlinePlayer);
  const [difficulty, setDifficulty] = useState<Difficulty>(defaultDifficulty);

  useEffect(() => {
    if (mode === 0) {
      setPlayers({ playerO: "", playerX: "" });
      setOnlinePlayer({ name: "" });
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
