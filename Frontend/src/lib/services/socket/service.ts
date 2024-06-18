import { io, Socket } from "socket.io-client";

const socket: Socket = io(`${process.env.SOCKET_URL}`, {
  transports: ["websocket"],
});

export default socket;
