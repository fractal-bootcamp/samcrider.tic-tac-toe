import { io, Socket } from "socket.io-client";

const backupUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5173"
    : "https://backend-tictactoe-rbv1.onrender.com";

const socket: Socket = io(`${process.env.SOCKET_URL || backupUrl}`, {
  transports: ["websocket"],
});

export default socket;
