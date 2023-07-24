import { sequelize } from "../../database/connection.js";
import { DataTypes } from "sequelize";
import { Genre } from "../genre/genre.model.js";

export const Novel = sequelize.define("novel_tbl", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // genre_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: Genre,
    //         key: "id",
    //     },
    // },
    chapters: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image_link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
});
// Genre.hasMany(Novel, { foreignKey: "genre_id" });
// Novel.belongsTo(Genre, { foreignKey: "genre_id" });
