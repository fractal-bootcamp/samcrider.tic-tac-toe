import Component from "./component";
import { useBoardData } from "./data";

const Board = () => {
  const { handleClick, handleReset, board, gameState } = useBoardData();
  return (
    <Component
      handleClick={handleClick}
      handleReset={handleReset}
      board={board}
      gameState={gameState}
    />
  );
};

export default Board;
