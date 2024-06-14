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
      <button
        onClick={() => setMode(3)}
        className="btn btn-warning top-20 absolute left-20"
      >
        Lobby
      </button>
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
          <div>Player: {players[0].name}</div>
          <div>{gameState.winner.playerX}</div>
        </div>
        <div className={s.scoreBox}>
          <div>Ties</div>
          <div>{gameState.ties}</div>
        </div>
        <div className={s.scoreBox}>
          <div>Player: {players[1].name}</div>
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
