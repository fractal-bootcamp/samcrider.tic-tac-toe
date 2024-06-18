import { Socket, io } from "socket.io-client";
import "./App.css";
import Start from "./components/pages/Start";

const App = () => {
  // create socket and useEffect to update gamelist state
  let counter = 0;
  const socket: Socket = io("http://localhost:5173", {
    transports: ["websocket"],
  });
  socket.on("message", (message) => {
    counter++;
    console.log(message, counter);
  });
  return <Start />;
};

export default App;
