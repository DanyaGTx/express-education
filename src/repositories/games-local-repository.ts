import { db } from "../db/db";
import { Game } from "../types";

export const gamesRepository = {
  async findGames(title: string): Promise<Game[]> {
    if (title) {
      return db.games.filter(
        (game) => game.title.toLowerCase().indexOf(title.toLowerCase()) > -1
      );
    }

    return db.games;
  },

  async findGameById(id: number) {
    const foundGame = db.games.find((game) => game.id === id);
    return foundGame;
  },

  async createGame(title: string) {
    const createdGame: any = {
      id: crypto.randomUUID(),
      title: title,
    };

    db.games.push(createdGame);
    return createdGame;
  },

  async deleteGame(id: number) {
    const games = db.games;
    for (let i = 0; i < games.length; i++) {
      if (games[i].id === id) {
        games.splice(i, 1);
        return true;
      }
    }
    return false;
  },

  async updateGame(id: number, title: string) {
    const foundGame = db.games.find((game) => game.id === id) as Game;

    if (foundGame) {
      foundGame.title = title;
      return true;
    } else {
      return false;
    }
  },
};
