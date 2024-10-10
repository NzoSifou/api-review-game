import { GameDTO } from "../dto/game.dto";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import {notFound, notFoundConsole} from "../error/NotFoundError";

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
}

export const gameService = new GameService();
