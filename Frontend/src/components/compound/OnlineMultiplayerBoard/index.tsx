import Component from "./component";
import { useBoardData } from "./data";
import { OnlineBoardProps } from "./types";

const OnlineMultiplayerBoard = ({
  selectedGame,
  setMode,
  onlinePlayer,
  setSelectedGame,
}: OnlineBoardProps) => {
  const { handleClick, handleReset, game, handleLeaveGame } = useBoardData(
    selectedGame,
    onlinePlayer,
    setSelectedGame
  );

  if (game) {
    return (
      <Component
        handleClick={handleClick}
        handleReset={handleReset}
        game={game}
        handleLeaveGame={handleLeaveGame}
      />
    );
  }
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="text-lg">
        Well... this is unexpected... doo doo doo...
        <div className="text-sm">Please return to the lobby</div>
      </div>
      <button
        onClick={() => {
          console.log("hereski");
          setMode(3);
        }}
        className="btn btn-wide btn-warning"
      >
        Lobby
      </button>
    </div>
  );
};

export default OnlineMultiplayerBoard;
