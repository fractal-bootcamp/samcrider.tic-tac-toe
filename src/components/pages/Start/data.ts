import { useState } from "react";
import { Mode } from "./types";

const defaultMode: Mode = null;

export const useStartPageData = () => {
  const [mode, setMode] = useState<Mode>(defaultMode);

  return { mode, setMode };
};
