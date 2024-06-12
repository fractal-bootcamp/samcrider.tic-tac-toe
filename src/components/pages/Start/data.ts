import { useState } from "react";
import { Mode, Players } from "./types";

const defaultMode: Mode = 0;

const defaultPlayers: Players = { playerO: "", playerX: "" };

export const useStartPageData = () => {
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [players, setPlayers] = useState<Players>(defaultPlayers);

  return { mode, setMode, players, setPlayers };
};
