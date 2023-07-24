import { sequelize } from "../../database/connection.js";
import { DataTypes } from "sequelize";
import { Genre } from "../genre/genre.model.js";
import { Novel } from "../novels/novel.model.js";

export const Genre_Novel = sequelize.define(
    "genre_novel_tbl",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        genre_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Genre,
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        novel_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Novel,
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    },
    {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    }
);
