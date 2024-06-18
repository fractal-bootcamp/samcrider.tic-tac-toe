import { io, Socket } from "socket.io-client";

const socket: Socket = io(process.env.API_URL || import.meta.env.API_URL, {
  transports: ["websocket"],
});

export default socket;
