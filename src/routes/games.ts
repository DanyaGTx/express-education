import { Router, Response } from "express";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery,
  DbTypes,
} from "../types";
import { GameCreateModel } from "../models/GameCreateModel";
import { GameUpdateModel } from "../models/GameUpdateModel";
import { GameViewModel } from "../models/GameViewModel";
import { QueryGamesModel } from "../models/QueryGamesModel";
import { authGuard } from "../middlewares/authGuard";
import { titleValidation } from "../validation";
import { inputValidation } from "../middlewares/inputValidation";
import { gamesService } from "../domain/games-service";

export const getGamesRouter = (db: DbTypes["games"]) => {
  const router = Router();

  router.get(
    "/",
    authGuard,
    async (req: RequestWithQuery<QueryGamesModel>, res: Response) => {
      const foundedGames = await gamesService.findGames(req.query.title);
      res.json(foundedGames);
    }
  );

  router.get(
    "/:id",
    async (
      req: RequestWithParams<{ id: string }>,
      res: Response<GameViewModel>
    ) => {
      const foundGame = await gamesService.findGameById(+req.params.id);
      if (!foundGame) {
        res.sendStatus(404);
        return;
      }
      res.status(200).json(foundGame);
    }
  );

  router.post(
    "/",
    titleValidation,
    inputValidation,
    async (req: RequestWithBody<GameCreateModel>, res: Response) => {
      const createdGame = await gamesService.createGame(req.body.title);
      res.status(201).json(createdGame);
    }
  );

  router.delete(
    "/:id",
    async (req: RequestWithParams<{ id: string }>, res: Response) => {
      const isDeleted = await gamesService.deleteGame(+req.params.id);

      if (isDeleted) {
        res.send(204);
      } else {
        res.send(404);
      }
    }
  );

  router.patch(
    "/:id",
    titleValidation,
    inputValidation,
    async (
      req: RequestWithParamsAndBody<{ id: string }, GameUpdateModel>,
      res: Response
    ) => {
      const isUpdated = await gamesService.updateGame(
        +req.params.id,
        req.body.title
      );

      if (isUpdated) {
        const game = await gamesService.findGameById(+req.params.id);
        res.status(200).json(game);
      } else {
        res.send(404);
      }
    }
  );

  return router;
};
