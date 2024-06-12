import Component from "./component";
import { useBoardData } from "./data";
import { BoardProps } from "./types";

const Board = ({ players, setMode }: BoardProps) => {
  console.log(players);
  const { handleClick, handleReset, board, gameState } = useBoardData();
  return (
    <Component
      handleClick={handleClick}
      handleReset={handleReset}
      board={board}
      gameState={gameState}
      setMode={setMode}
    />
  );
};

export default Board;
