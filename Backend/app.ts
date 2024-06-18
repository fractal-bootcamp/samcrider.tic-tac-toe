import express from "express";
import cors from "cors";
import gameRouter from "./lib/controllers/game/controller";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/api/games", gameRouter);

export default app;
