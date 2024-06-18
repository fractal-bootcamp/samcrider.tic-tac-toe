import config from "./utils/config";
import app from "./app";

import { Server } from "socket.io";

const server = app.listen(config.PORT, () => {
  console.log("listening on port: ", config.PORT);
});

export const io = new Server(server, {
  cors: {
    origin: [`${process.env.API_URL}`],
  },
  transports: ["websocket"],
});
