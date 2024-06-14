import { Fields } from "./types";

const Component = ({ setMode, onlinePlayer }: Fields) => {
  return (
    <div>
      <h1>lobby</h1>
      <button
        onClick={() => setMode(0)}
        className="btn btn-warning top-20 absolute left-20"
      >
        Home
      </button>
      <h3>Players</h3>
      <div>{onlinePlayer.name}</div>
    </div>
  );
};

export default Component;
