import Board from "../../compound/Board";
import { Fields } from "./types";

const Component = ({ mode, setMode }: Fields) => {
  if (mode === 1) {
    return <div className="text-white">coming soon</div>;
  }
  if (mode === 2) {
    return <Board />;
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
        <button className="btn btn-wide btn-warning" onClick={() => setMode(2)}>
          MULTIPLAYER
        </button>
      </div>
    </div>
  );
};

export default Component;
