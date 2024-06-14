import { useEffect, useState } from "react";
import { Difficulty, Mode, Players } from "./types";

const defaultMode: Mode = 0;
const defaultPlayers: Players = { playerO: "", playerX: "" };
const defaultDifficulty = "easy";

export const useStartPageData = () => {
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [players, setPlayers] = useState<Players>(defaultPlayers);
  const [difficulty, setDifficulty] = useState<Difficulty>(defaultDifficulty);

  useEffect(() => {
    if (mode === 0) {
      setPlayers({ playerO: "", playerX: "" });
    }
  }, [mode]);

  return { mode, setMode, players, setPlayers, difficulty, setDifficulty };
};
