import { sequelize } from "../../database/connection.js";
import { DataTypes } from "sequelize";
import { Novel } from "../novels/novel.model.js";
import { User } from "../users/user.model.js";

export const Bookmark = sequelize.define("bookmark_tbl", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: User, key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    novel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Novel, key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
