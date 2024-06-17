import { Fields } from "./types";
import s from "./styles.module.css";

const Component = ({
  board,
  handleClick,
  handleReset,
  gameState,
  setMode,
  players,
}: Fields) => {
  return (
    <div className="flex flex-col items-center">
      <div className={s.boardContainer}>
        {board.map((cell, i) => (
          <button
            key={i}
            className={s.boardButton}
            onClick={() => handleClick(cell)}
            disabled={
              gameState.currentGameFinished ? true : cell.value ? true : false
            }
          >
            <span>{cell.value}</span>
          </button>
        ))}
      </div>
      <div className="divider divider-warning"></div>
      <div className={s.scoreContainer}>
        <div className={s.scoreBox}>
          <div>Player: {players.playerX}</div>
          <div>{gameState.winner.playerX}</div>
        </div>
        <div className={s.scoreBox}>
          <div>Ties</div>
          <div>{gameState.ties}</div>
        </div>
        <div className={s.scoreBox}>
          <div>Player: {players.playerO}</div>
          <div>{gameState.winner.playerO}</div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <button
          onClick={() => setMode(0)}
          className="btn btn-wide h-fit btn-warning font-bold text-2xl uppercase"
        >
          Home
        </button>
        <button
          className="btn btn-wide h-fit btn-warning font-bold text-2xl uppercase"
          onClick={handleReset}
          disabled={gameState.currentGameFinished ? false : true}
        >
          play again
        </button>
      </div>
    </div>
  );
};

export default Component;
