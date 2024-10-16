export interface ReviewDTO {
    id?: number;
    game_id: number;
    rating: number;
    review_text?: string;
}