import { Cell, Game, Player } from "../../../lib/services/game/types";
import { gameService } from "../../../lib/services/game/service";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useBoardData = (
  selectedGame: Game,
  onlinePlayer: Player,
  setSelectedGame: Dispatch<SetStateAction<Game | undefined>>
) => {
  const [game, setGame] = useState<Game | null>(selectedGame);
  const [poller, setPoller] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = async () => {
      if (!game) return;

      const data = await gameService().hydrateGame(game.id);
      setGame(data.game);
    };
    unsubscribe();

    setTimeout(() => setPoller(poller + 1), 1000);
  }, [poller]);

  const handleClick = async (cell: Cell) => {
    if (!game) return;

    if (game.currentPlayer?.name === onlinePlayer.name) {
      const data = await gameService().makeGameMove(cell, game.id);
      setGame(data.game);
    }
  };

  const handleReset = async () => {
    // call to backend to clear board and set current player to X, also set current game finished to false
    if (!game) return;
    const data = await gameService().resetGameBoard(game.id);
    setGame(data.game);
  };

  // NOTE: the game needs to be unplayable without two players
  const handleLeaveGame = async () => {
    // hit backend and remove the player from the game object
    // just return 200 status and then set the mode to 3 to move player back to lobby
    if (!game) return;
    gameService()
      .leaveGame(game.id, onlinePlayer)
      .then(() => {
        setGame(null);
        setSelectedGame(undefined);
      });
  };

  return {
    handleClick,
    handleReset,
    game,
    handleLeaveGame,
  };
};
