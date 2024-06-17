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
      <button
        onClick={handleLeaveGame}
        className="btn btn-warning top-20 absolute left-20"
      >
        Lobby
      </button>
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
      <button
        className="btn btn-wide h-fit btn-warning font-bold text-2xl uppercase"
        onClick={handleReset}
        disabled={game.winState.currentGameFinished ? false : true}
      >
        play again
      </button>
    </div>
  );
};

export default Component;
