import express from "express";
import { DbTypes } from "../types";

export const getTestRouter = (db: DbTypes["games"]) => {
  const router = express.Router();

  router.delete("/data", (req, res) => {
    db.games = [];
    res.sendStatus(204);
  });

  return router;
};
