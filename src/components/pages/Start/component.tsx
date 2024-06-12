import Board from "../../compound/Board";
import { Fields } from "./types";

const Component = ({ mode, setMode, players, setPlayers }: Fields) => {
  if (mode === 1) {
    return <div className="text-white">coming soon</div>;
  }
  if (mode === 2) {
    return <Board players={players} setMode={setMode} />;
  }

  return (
    <div className="flex flex-col items-center gap-10 pb-48">
      <div className="uppercase text-8xl text-white font-extrabold">
        tic tac toe
      </div>
      <div className="text-white text-md">Hey! Great to have you.</div>
      <div className="flex flex-col gap-4 pt-20">
        <button className="btn btn-wide btn-warning" onClick={() => setMode(1)}>
          SINGLEPLAYER
        </button>
        <button
          className="btn btn-wide btn-warning"
          onClick={() =>
            (
              document.getElementById("multiplayerModal") as HTMLFormElement
            )?.showModal()
          }
        >
          MULTIPLAYER
        </button>
        <dialog id="multiplayerModal" className="modal">
          <div className="modal-box flex flex-col gap-4">
            <h3 className="font-bold text-lg">MULTIPLAYER</h3>
            <div className="flex flex-row items-center gap-10">
              <div className="flex flex-col gap-2 flex-1">
                <input
                  type="text"
                  placeholder="Player X"
                  className="input input-bordered w-full"
                  value={players.playerX}
                  onChange={({ target }) =>
                    setPlayers({ ...players, playerX: target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Player O"
                  className="input input-bordered w-full"
                  value={players.playerO}
                  onChange={({ target }) =>
                    setPlayers({ ...players, playerO: target.value })
                  }
                />
              </div>
              <button
                className="btn btn-warning uppercase mr-4"
                onClick={() => {
                  setMode(2);
                }}
                disabled={!players.playerO || !players.playerX ? true : false}
              >
                play
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default Component;
