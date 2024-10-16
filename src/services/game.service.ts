import {GameInputDTO, GameOutputDTO} from "../dto/game.dto";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import {notFound, notFoundConsole} from "../error/NotFoundError";
import {Review} from "../models/review.model";
import {preconditionFailed} from "../error/PreconditionFailedError";
import {toGameModel, toGameOutputDTO} from "../mappers/game.mapper";

export class GameService {
  public async getAllGames(): Promise<GameOutputDTO[]> {
    const games = await Game.findAll({
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });
    return games.map(toGameOutputDTO);
  }

  public async getGameById(id: number): Promise<GameOutputDTO | null> {
    const game = await Game.findByPk(id, {
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });
    if (game) return toGameOutputDTO(game);
    notFound(id.toString());
  }

  public async createGame(dto: GameInputDTO): Promise<GameOutputDTO> {
    const console = await Console.findByPk(dto.console_id);
    if (!console) notFoundConsole(dto.console_id.toString());
    const game = await Game.create(toGameModel(dto));
    return toGameOutputDTO(game);
  }

  public async updateGame(
      id: number,
      dto: Partial<GameInputDTO>
  ): Promise<GameOutputDTO | null> {
    const game = await Game.findByPk(id);
    if (game) {
      if (dto.title) game.title = dto.title;
      if (dto.console_id) {
        const console = await Console.findByPk(dto.console_id);
        if (!console) notFoundConsole(dto.console_id.toString());
        game.console_id = dto.console_id;
      }
      await game.save();
      return toGameOutputDTO(game);
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
