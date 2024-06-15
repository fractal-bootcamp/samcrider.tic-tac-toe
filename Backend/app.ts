import express from "express";
import cors from "cors";
import gameRouter from "./lib/controllers/game/controller";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/games", gameRouter);

export default app;
