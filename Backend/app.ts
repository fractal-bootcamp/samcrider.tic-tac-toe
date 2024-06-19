import express from "express";
import cors from "cors";
import gameRouter from "./lib/controllers/game/controller";

const app = express();

app.use(
  cors({
    origin: [
      "https://frontend-tictactoe-z8th.onrender.com",
      "http://localhost:5173",
    ],

    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

app.use("/api/games", gameRouter);

export default app;
