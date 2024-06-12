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
      <div>
        <div>
          <div>Player: X</div>
          <div>{gameState.winner.playerX}</div>
        </div>
        <div>
          <div>Ties</div>
          <div>{gameState.ties}</div>
        </div>
        <div>
          <div>Player: O</div>
          <div>{gameState.winner.playerO}</div>
        </div>
      </div>
      <button className={s.resetButton} onClick={handleReset}>
        reset
      </button>
    </div>
  );
};

export default Component;
