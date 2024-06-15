import { Fields } from "./types";
import OnlineMultiplayerBoard from "../OnlineMultiplayerBoard";

const Component = ({
  setMode,
  games,
  handleJoinGame,
  selectedGame,
  onlinePlayer,
  handleCreateGame,
  gameTitle,
  setGameTitle,
}: Fields) => {
  if (selectedGame) {
    return (
      <OnlineMultiplayerBoard
        setMode={setMode}
        selectedGame={selectedGame}
        onlinePlayer={onlinePlayer}
      />
    );
  }

  return (
    <div className="h-[100vh] flex flex-col gap-36 p-10">
      <button
        onClick={() => setMode(0)}
        className="btn btn-warning top-20 absolute left-20"
      >
        Home
      </button>
      <div className="uppercase text-8xl text-white font-extrabold">lobby</div>

      <div className="flex flex-row gap-6 flex-wrap justify-center">
        <div className="card w-96 bg-neutral text-neutral-content">
          <div className="card-body items-center text-center">
            <input
              type="text"
              value={gameTitle}
              onChange={({ target }) => setGameTitle(target.value)}
              placeholder="New game"
              className="input input-bordered w-full max-w-xs"
            />
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                disabled={gameTitle ? false : true}
                onClick={handleCreateGame}
              >
                Start
              </button>
            </div>
          </div>
        </div>
        {games ? (
          games.map((game) => {
            return (
              <div
                key={game.id}
                className="card w-96 bg-neutral text-neutral-content"
              >
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{game.name}</h2>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleJoinGame(game.id)}
                    >
                      Join
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>No games? Start one!</div>
        )}
      </div>
    </div>
  );
};

export default Component;
