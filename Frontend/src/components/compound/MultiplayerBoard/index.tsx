import Component from "./component";
import { useBoardData } from "./data";
import { BoardProps } from "./types";

const MultiplayerBoard = ({ players, setMode }: BoardProps) => {
  const { handleClick, handleReset, board, gameState } = useBoardData();
  return (
    <Component
      handleClick={handleClick}
      handleReset={handleReset}
      board={board}
      gameState={gameState}
      setMode={setMode}
      players={players}
    />
  );
};

export default MultiplayerBoard;
