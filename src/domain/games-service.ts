import { Game } from "../types";
import { gamesRepository } from "../repositories/games-db-repository";

export const gamesService = {
  async findGames(title: string): Promise<Game[]> {
    return gamesRepository.findGames(title);
  },

  async findGameById(id: number) {
    return gamesRepository.findGameById(id);
  },

  async createGame(title: string) {
    const createdGame: Game = {
      id: +new Date().getMilliseconds(),
      title: title,
    };

    return gamesRepository.createGame(createdGame);
  },

  async updateGame(id: number, title: string) {
    return gamesRepository.updateGame(id, title);
  },

  async deleteGame(id: number) {
    return gamesRepository.deleteGame(id);
  },
};
