import React from "react";
import { Fields } from "./types";

const MultiPlayer = ({ players, setPlayers, setMode }: Fields) => {
  return (
    <div>
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
  );
};

export default MultiPlayer;
