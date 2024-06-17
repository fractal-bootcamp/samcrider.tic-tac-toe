import { Fields } from "./types";
import s from "./styles.module.css";

const Component = ({
  handleClick,
  handleLeaveGame,
  handleReset,
  game,
}: Fields) => {
  return (
    <div className="flex flex-col items-center">
      <div className={s.boardContainer}>
        {game.board.map((cell, i) => (
          <button
            key={i}
            className={s.boardButton}
            onClick={() =>
              game.playerO && game.playerX
                ? handleClick(cell)
                : alert("waiting for second player")
            }
            disabled={
              game.winState.currentGameFinished
                ? true
                : cell.value
                ? true
                : false
            }
          >
            <span>{cell.value}</span>
          </button>
        ))}
      </div>
      <div className="divider divider-warning"></div>
      <div className={s.scoreContainer}>
        <div className={s.scoreBox}>
          <div>Player: {game.playerX ? game.playerX.name : "Waiting..."}</div>
          <div>{game.winState.playerX}</div>
        </div>
        <div className={s.scoreBox}>
          <div>Ties</div>
          <div>{game.winState.ties}</div>
        </div>
        <div className={s.scoreBox}>
          <div>Player: {game.playerO ? game.playerO.name : "Waiting..."}</div>
          <div>{game.winState.playerO}</div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <button
          onClick={handleLeaveGame}
          className="btn btn-wide h-fit btn-warning font-bold text-2xl uppercase"
        >
          Lobby
        </button>
        <button
          className="btn btn-wide h-fit btn-warning font-bold text-2xl uppercase"
          onClick={handleReset}
          disabled={game.winState.currentGameFinished ? false : true}
        >
          play again
        </button>
      </div>
    </div>
  );
};

export default Component;
