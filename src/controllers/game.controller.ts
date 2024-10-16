import {Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags} from "tsoa";
import { gameService } from "../services/game.service";
import {ReviewDTO} from "../dto/review.dto";
import {GameInputDTO, GameOutputDTO} from "../dto/game.dto";

@Route("games")
@Tags("Games")
export class GameController extends Controller {
  @Get("/")
  public async getAllGames(): Promise<GameOutputDTO[]> {
    return gameService.getAllGames();
  }

  @Get("{id}")
  public async getGameById(@Path() id: number): Promise<GameOutputDTO | null> {
    return gameService.getGameById(id);
  }

  // Crée un nouveau jeu
  @Post("/")
  public async createGame(
      @Body() requestBody: GameInputDTO
  ): Promise<GameOutputDTO> {
    const { title, console_id } = requestBody;
    return gameService.createGame({ title, console_id });
  }

  // Met à jour un jeu par ID
  @Patch("{id}")
  public async updateGame(
      @Path() id: number,
      @Body() requestBody: Partial<GameInputDTO>
  ): Promise<GameOutputDTO | null> {
    const { title, console_id } = requestBody;
    return gameService.updateGame(id, {title, console_id});
  }

  // Supprime un jeu par ID
  @Delete("{id}")
  public async deleteGame(@Path() id: number): Promise<void> {
    await gameService.deleteGame(id);
  }

  @Get("{id}/reviews")
  public async getReviewsByGameId(@Path() id: number): Promise<ReviewDTO[]> {
    return gameService.getReviewsByGameId(id);
  }
}