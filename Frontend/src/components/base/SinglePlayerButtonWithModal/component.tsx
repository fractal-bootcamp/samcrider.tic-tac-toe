import React from "react";
import { Fields } from "./types";

const SinglePlayer = ({
  players,
  setPlayers,
  difficulty,
  setDifficulty,
  setMode,
}: Fields) => {
  return (
    <div>
      <button
        className="btn btn-wide btn-warning"
        onClick={() =>
          (
            document.getElementById("singleplayerModal") as HTMLFormElement
          )?.showModal()
        }
      >
        SINGLEPLAYER
      </button>
      <dialog id="singleplayerModal" className="modal">
        <div className="modal-box flex flex-col gap-4">
          <h3 className="font-bold text-lg">SINGLEPLAYER</h3>
          <div className="flex flex-row items-center gap-10">
            <div className="flex flex-col gap-2 flex-1">
              <input
                type="text"
                placeholder="Player X"
                className="input input-bordered w-full"
                value={players.playerX}
                onChange={({ target }) =>
                  setPlayers({ playerX: target.value, playerO: "Agent" })
                }
              />
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">AI Difficulty</span>
                  <div className="flex items-center gap-2">
                    <span className="label-text">Easy</span>
                    <input
                      type="checkbox"
                      className="toggle"
                      value={difficulty}
                      onChange={() =>
                        setDifficulty(difficulty === "easy" ? "hard" : "easy")
                      }
                    />
                    <span className="label-text">Hard</span>
                  </div>
                </label>
              </div>
            </div>
            <button
              className="btn btn-warning uppercase mr-4"
              onClick={() => {
                setMode(1);
              }}
              disabled={!players.playerX ? true : false}
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

export default SinglePlayer;
