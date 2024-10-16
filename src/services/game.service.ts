import { GameDTO } from "../dto/game.dto";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import {notFound, notFoundConsole} from "../error/NotFoundError";
import {Review} from "../models/review.model";
import {preconditionFailed} from "../error/PreconditionFailedError";

export class GameService {
  public async getAllGames(): Promise<GameDTO[]> {
    return Game.findAll({
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });
  }

  // Récupère un jeu par ID
  public async getGameById(id: number): Promise<Game | null> {
    const game = await Game.findByPk(id);
    if(game) return game;
    notFound(id.toString());
  }

  // Crée un nouveau jeu
  public async createGame(
      title: string,
      console_id: number
  ): Promise<Game> {
    const console = await Console.findByPk(console_id);
    if(!console) notFoundConsole(console_id.toString());
    return Game.create({ title: title, console_id: console_id });
  }

  // Met à jour un jeu
  public async updateGame(
      id: number,
      title?: string,
      console_id?: number
  ): Promise<Game | null> {
    const game = await Game.findByPk(id);
    if (game) {
      if(title) game.title = title;
      if(console_id) {
        const console = await Console.findByPk(console_id);
        if(!console) notFoundConsole(console_id.toString());
        game.console_id = console_id;
      }
      await game.save();
      return game;
    }
    notFound(id.toString());
  }

  public async deleteGame(id: number): Promise<void> {
    const game = await Game.findByPk(id);
    if (game) {
      const reviews = await Review.findAll({ where: { game_id: game.id } });
      if (reviews.length > 0) {
        preconditionFailed("Reviews");
      }
      await game.destroy();
    } else {
      notFound(id.toString());
    }
  }

  public async getReviewsByGameId(id: number): Promise<Review[]> {
    const game = await Game.findByPk(id);
    if (!game) {
      notFound(id.toString());
    }
    return Review.findAll({ where: { game_id: id } });
  }
}

export const gameService = new GameService();
