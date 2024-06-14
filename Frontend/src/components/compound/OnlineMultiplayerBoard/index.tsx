import Component from "./component";
import { useBoardData } from "./data";
import { OnlineBoardProps } from "./types";

const OnlineMultiplayerBoard = ({
  player,
  gameId,
  setJoined,
  setMode,
}: OnlineBoardProps) => {
  const { handleClick, handleReset, gameState, players, game } = useBoardData(
    gameId,
    player
  );

  if (game) {
    return (
      <Component
        handleClick={handleClick}
        handleReset={handleReset}
        board={game.board}
        gameState={gameState}
        setMode={setMode}
        players={players}
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
          setJoined({ joined: false, gameId: null });
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
