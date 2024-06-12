import s from "./styles.module.css";
import { Fields } from "./types";

const Component = ({ board, handleClick, handleReset, gameState }: Fields) => {
  return (
    <div>
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
          <div>Player: X</div>
          <div>{gameState.winner.playerX}</div>
        </div>
        <div className={s.scoreBox}>
          <div>Ties</div>
          <div>{gameState.ties}</div>
        </div>
        <div className={s.scoreBox}>
          <div>Player: O</div>
          <div>{gameState.winner.playerO}</div>
        </div>
      </div>
      <button
        className="btn btn-wide h-fit btn-warning font-bold text-2xl uppercase"
        onClick={handleReset}
        disabled={gameState.currentGameFinished ? false : true}
      >
        play again
      </button>
    </div>
  );
};

export default Component;
