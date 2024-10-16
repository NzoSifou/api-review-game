import {GameInputDTO, GameOutputDTO} from "../dto/game.dto";
import {Game} from "../models/game.model";
import {Console} from "../models/console.model";
import {notFoundConsole} from "../error/NotFoundError";

export async function toGameOutputDTO(game: Game): Promise<GameOutputDTO> {
    if (!game.console) {
        const console = await Console.findByPk(game.console_id);
        if(!console) notFoundConsole(game.console_id.toString());
        return {
            id: game.id,
            title: game.title,
            console: {
                id: console.id,
                name: console.name,
            },
        }
    }
    return {
        id: game.id,
        title: game.title,
        console: {
            id: game.console.id,
            name: game.console.name,
        },
    };
}

export function toGameModel(dto: GameInputDTO): Omit<Game, 'id'> {
    return {
        title: dto.title,
        console_id: dto.console_id,
    } as Omit<Game, 'id'>;
}