import { useEffect, useState } from "react";
import Component from "./component";
import { useBoardData } from "./data";
import { Game, Player } from "../../../lib/services/game/types";
import { OnlineBoardProps } from "./types";
import { gameService } from "../../../lib/services/game/service";

const OnlineMultiplayerBoard = ({
  player,
  gameId,
  setJoined,
  setMode,
}: OnlineBoardProps) => {
  console.log("for real here");

  const { handleClick, handleReset, board, gameState } = useBoardData();
  const [players, setPlayers] = useState<Player[]>([]);
  const [game, setGame] = useState<Game | undefined>(undefined);

  const getGame = async () => {
    try {
      const data = await gameService().getGame(gameId);
      const game = data.game as Game;
      setGame(game);
    } catch (e) {
      console.error(e);
    }
  };

  // useEffect(() => {
  //   getGame();
  // }, []);
  // setPlayers([...players, player]);

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
