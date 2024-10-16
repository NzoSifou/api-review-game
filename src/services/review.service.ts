import {Console} from "../models/console.model";
import {notFound, notFoundConsole, notFoundGame} from "../error/NotFoundError";
import {Review} from "../models/review.model";
import {ReviewDTO} from "../dto/review.dto";
import {Game} from "../models/game.model";
import {GameService} from "./game.service";

export class ReviewService {
    public async getAllReviews(): Promise<ReviewDTO[]> {
        return Review.findAll({
            include: [
                {
                    model: Game,
                    as: "game",
                    include: [
                        {
                            model: Console,
                            as: "console",
                        }
                    ]
                },
            ],
        });
    }

    // Récupère une review par ID
    public async getReviewById(id: number): Promise<Review | null> {
        const review = await Review.findByPk(id);
        if(review) return review;
        notFound(id.toString());
    }

    // Crée une nouvelle review
    public async createReview(game_id: number, rating: number, review_text: string | undefined) {
        const game = await Game.findByPk(game_id);
        if(!game) notFoundGame(game_id.toString());
        return Review.create({ game_id: game_id, rating: rating, review_text: review_text });
    }

    // Met à jour une review
    public async updateReview(
        id: number,
        game_id?: number,
        rating?: number,
        review_text?: string
    ): Promise<Review | null> {
        const review = await Review.findByPk(id);
        if (review) {
            if(game_id) {
                const game = await Game.findByPk(game_id);
                if(!game) notFoundGame(game_id.toString());
                review.game_id = game_id;
            }
            if(rating) review.rating = rating;
            if(review_text) review.review_text = review_text;
            await review.save();
            return review;
        }
        notFound(id.toString());
    }

    public async deleteReview(id: number): Promise<void> {
        const review = await Review.findByPk(id);
        if (review) {
            await review.destroy();
        }
        notFound(id.toString());
    }
}

export const reviewService = new ReviewService();