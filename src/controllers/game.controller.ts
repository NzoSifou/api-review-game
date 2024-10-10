import {Body, Controller, Get, Patch, Path, Post, Route, Tags} from "tsoa";
import { GameDTO } from "../dto/game.dto";
import { gameService } from "../services/game.service";
import {ConsoleDTO} from "../dto/console.dto";
import {consoleService} from "../services/console.service";

@Route("games")
@Tags("Games")
export class GameController extends Controller {
  @Get("/")
  public async getAllGames(): Promise<GameDTO[]> {
    return gameService.getAllGames();
  }

  @Get("{id}")
  public async getGameById(@Path() id: number): Promise<GameDTO | null> {
    return gameService.getGameById(id);
  }

  // Crée un nouveau jeu
  @Post("/")
  public async createGame(
      @Body() requestBody: GameDTO
  ): Promise<GameDTO> {
    const { title, console_id } = requestBody;
    return gameService.createGame(title, console_id);
  }

  // Met à jour un jeu par ID
  @Patch("{id}")
  public async updateConsole(
      @Path() id: number,
      @Body() requestBody: GameDTO
  ): Promise<GameDTO | null> {
    const { title, console_id } = requestBody;
    return gameService.updateGame(id, title, console_id);
  }
}