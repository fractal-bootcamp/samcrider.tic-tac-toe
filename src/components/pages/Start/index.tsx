import Component from "./component";
import { useStartPageData } from "./data";

const Start = () => {
  const { mode, setMode, players, setPlayers, difficulty, setDifficulty } =
    useStartPageData();
  return (
    <Component
      mode={mode}
      setMode={setMode}
      players={players}
      setPlayers={setPlayers}
      difficulty={difficulty}
      setDifficulty={setDifficulty}
    />
  );
};

export default Start;
