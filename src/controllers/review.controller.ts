import {Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags} from "tsoa";
import {ReviewDTO} from "../dto/review.dto";
import {reviewService} from "../services/review.service";
import {GameDTO} from "../dto/game.dto";
import {gameService} from "../services/game.service";
import {Review} from "../models/review.model";
@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
    @Get("/")
    public async getAllReviews(): Promise<ReviewDTO[]> {
        return reviewService.getAllReviews();
    }

    @Get("{id}")
    public async getReviewById(@Path() id: number): Promise<ReviewDTO | null> {
        return reviewService.getReviewById(id);
    }

    // Crée une nouvelle review
    @Post("/")
    public async createReview(
        @Body() requestBody: ReviewDTO
    ): Promise<ReviewDTO> {
        const { game_id, rating, review_text } = requestBody;
        return reviewService.createReview(game_id, rating, review_text);
    }

    // Met à jour une review par ID
    @Patch("{id}")
    public async updateConsole(
        @Path() id: number,
        @Body() requestBody: ReviewDTO
    ): Promise<ReviewDTO | null> {
        const { game_id, rating, review_text } = requestBody;
        return reviewService.updateReview(id, game_id, rating, review_text);
    }

    // Supprime une review par ID
    @Delete("{id}")
    public async deleteReview(@Path() id: number): Promise<void> {
        await reviewService.deleteReview(id);
    }
}
