import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import {Console} from "./console.model";
import {Game} from "./game.model"; // Connexion à la base de données

export interface ReviewAttributes {
    id?: number;
    game_id: number;
    rating: number;
    review_text?: string;
}

export class Review
  extends Model<ReviewAttributes>
  implements ReviewAttributes
{
    public id!: number;
    public game_id!: number;
    public rating!: number;
    public review_text!: string;
}

Review.init(
  {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      game_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      rating: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      review_text: {
          type: DataTypes.STRING,
          allowNull: true,
      },
  },
  {
    sequelize,
    tableName: "reviews",
  }
);

Review.belongsTo(Game, { foreignKey: "game_id", as: "game" })