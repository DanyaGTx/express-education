import express from "express";
import { getGamesRouter } from "./routes/games";
import { getTestRouter } from "./routes/tests";
import { db } from "./db/db";
import { requestCounter } from "./middlewares/requestCounter";
// import { authGuard } from "./middlewares/authGuard";

export const app = express();

app.use(express.json());
app.use(requestCounter);
// app.use(authGuard);
app.use("/games", getGamesRouter(db));
app.use("/__tests__", getTestRouter(db));
