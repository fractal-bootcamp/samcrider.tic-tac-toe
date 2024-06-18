// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

import express from "express";
import serverless from "serverless-http";
import gameRouter from "../../lib/controllers/game/controller";

const api = express();

api.use("/api/games/", gameRouter);

export const handler = serverless(api);
