import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:5173", {
  transports: ["websocket"],
});

export default socket;
