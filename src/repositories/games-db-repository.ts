import { Game } from "../types";
import { gamesCollection } from "./db";

export const gamesRepository = {
  async findGames(title: string): Promise<Game[]> {
    const filter: any = {};

    if (title) {
      filter.title = { $regex: title };
    }

    return gamesCollection.find(filter).toArray();
  },

  async findGameById(id: number) {
    const foundGame = await gamesCollection.findOne({ id: id });

    return foundGame;
  },

  async createGame(createdGame: Game) {
    await gamesCollection.insertOne(createdGame);

    return createdGame;
  },

  async updateGame(id: number, title: string) {
    const foundGame = await gamesCollection.updateOne(
      { id: id },
      { $set: { title: title } }
    );

    return foundGame.matchedCount === 1;
  },

  async deleteGame(id: number) {
    const result = await gamesCollection.deleteOne({ id: id });

    return result.deletedCount === 1;
  },
};
