import React from "react";
import Component from "./component";
import { useStartPageData } from "./data";

const Start = () => {
  const {
    mode,
    setMode,
    players,
    setPlayers,
    difficulty,
    setDifficulty,
    onlinePlayer,
    setOnlinePlayer,
  } = useStartPageData();
  return (
    <Component
      mode={mode}
      setMode={setMode}
      players={players}
      setPlayers={setPlayers}
      difficulty={difficulty}
      setDifficulty={setDifficulty}
      onlinePlayer={onlinePlayer}
      setOnlinePlayer={setOnlinePlayer}
    />
  );
};

export default Start;
