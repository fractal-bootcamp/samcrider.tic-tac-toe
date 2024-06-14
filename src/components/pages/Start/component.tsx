import MultiPlayer from "../../base/MultiPlayerButtonWithModal/component";
import OnlineMultiPlayer from "../../base/OnlineMultiPlayerButtonWithModal/component";
import SinglePlayer from "../../base/SinglePlayerButtonWithModal/component";
import MultiplayerBoard from "../../compound/MultiplayerBoard";
import OnlineMultiplayerLobby from "../../compound/OnlineMultiplayerLobby";
import SingleplayerBoard from "../../compound/SingleplayerBoard";
import { Fields } from "./types";

const Component = ({
  mode,
  setMode,
  players,
  setPlayers,
  difficulty,
  setDifficulty,
  onlinePlayer,
  setOnlinePlayer,
}: Fields) => {
  if (mode === 1) {
    return (
      <SingleplayerBoard
        players={players}
        setMode={setMode}
        difficulty={difficulty}
      />
    );
  }
  if (mode === 2) {
    return <MultiplayerBoard players={players} setMode={setMode} />;
  }

  if (mode === 3) {
    return (
      <OnlineMultiplayerLobby setMode={setMode} onlinePlayer={onlinePlayer} />
    );
  }

  return (
    <div className="flex flex-col items-center gap-10 pb-48">
      <div className="uppercase text-8xl text-white font-extrabold">
        tic tac toe
      </div>
      <div className="text-white text-md">Hey! Great to have you.</div>
      <div className="flex flex-col gap-4 pt-20">
        <SinglePlayer
          players={players}
          setPlayers={setPlayers}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          setMode={setMode}
        />
        <MultiPlayer
          players={players}
          setPlayers={setPlayers}
          setMode={setMode}
        />
        <OnlineMultiPlayer
          setMode={setMode}
          onlinePlayer={onlinePlayer}
          setOnlinePlayer={setOnlinePlayer}
        />
      </div>
    </div>
  );
};

export default Component;
