import Component from "./component";
import { useStartPageData } from "./data";

const Start = () => {
  const { mode, setMode, players, setPlayers } = useStartPageData();
  return (
    <Component
      mode={mode}
      setMode={setMode}
      players={players}
      setPlayers={setPlayers}
    />
  );
};

export default Start;
