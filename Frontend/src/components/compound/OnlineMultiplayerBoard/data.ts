import { Cell, Game, Player } from "../../../lib/services/game/types";
import { gameService } from "../../../lib/services/game/service";
import { useEffect, useState } from "react";

export const useBoardData = (selectedGame: Game, onlinePlayer: Player) => {
  const [game, setGame] = useState<Game>(selectedGame);
  const [poller, setPoller] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = async () => {
      const data = await gameService().hydrateGame(game.id);
      setGame(data.game);
    };
    unsubscribe();

    setTimeout(() => setPoller(poller + 1), 1000);
  }, [poller]);

  const handleClick = async (cell: Cell) => {
    console.log("current player", game.currentPlayer);
    console.log("online player", onlinePlayer);

    if (game.currentPlayer?.name === onlinePlayer.name) {
      console.log("passed check");

      const data = await gameService().makeGameMove(cell, selectedGame.id);
      setGame(data.game);
    }
  };

  const handleReset = async (id: string) => {
    // call to backend to clear board and set current player to X, also set current game finished to false
    const data = await gameService().resetGameBoard(id);
    setGame(data.game);
  };

  // NOTE: the game needs to be unplayable without two players
  const handleLeaveGame = async (id: string) => {
    // hit backend and remove the player from the game object
    // just return 200 status and then set the mode to 3 to move player back to lobby
  };

  return {
    handleClick,
    handleReset,
    game,
  };
};
