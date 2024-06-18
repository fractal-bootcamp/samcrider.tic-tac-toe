import config from "./utils/config";
import app from "./app";

import { createServer } from "node:http";
import { Server } from "socket.io";

// initialize socket server on port 3003
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3003"],
  },
  transports: ["websocket"],
});

// listen to it
server.listen(3003, () => {
  console.log("socket server listening at 3003");
});

// test connection
io.on("connection", (socket) => {
  io.emit("message", "hello frontend");
  socket.on("disconnect", () => {
    io.emit("message", "goodbye frontend");
  });
});

app.listen(config.PORT, () => {
  console.log("listening on port: ", config.PORT);
});
