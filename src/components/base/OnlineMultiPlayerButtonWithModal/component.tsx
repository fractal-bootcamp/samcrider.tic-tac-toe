import { Fields } from "./types";

const OnlineMultiPlayer = ({
  setMode,
  setOnlinePlayer,
  onlinePlayer,
}: Fields) => {
  return (
    <div>
      <button
        className="btn btn-wide btn-warning"
        onClick={() =>
          (
            document.getElementById("onlineMultiplayerModal") as HTMLFormElement
          )?.showModal()
        }
      >
        ONLINE MULTIPLAYER
      </button>
      <dialog id="onlineMultiplayerModal" className="modal">
        <div className="modal-box flex flex-col gap-4">
          <h3 className="font-bold text-lg">ONLINE MULTIPLAYER</h3>
          <div className="flex flex-row items-center gap-10">
            <div className="flex flex-col gap-2 flex-1">
              <input
                type="text"
                placeholder="Your name"
                className="input input-bordered w-full"
                value={onlinePlayer.name}
                onChange={({ target }) =>
                  setOnlinePlayer({ name: target.value })
                }
              />
            </div>
            <button
              className="btn btn-warning uppercase mr-4"
              onClick={() => {
                setMode(3);
              }}
              disabled={!onlinePlayer ? true : false}
            >
              Drop In
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

export default OnlineMultiPlayer;
