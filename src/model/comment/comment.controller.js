import { sqlConnection, sequelize } from "../../database/connection.js";
import { Comment } from "./comment.model.js";
import responseHandler from "../../utils/responseHandler.js";
import Sentiment from "sentiment";
import * as dotenv from "dotenv";
dotenv.config();
const DB_NAME = process.env.DB_NAME;

const sql = await sqlConnection(DB_NAME);
const sentiment = new Sentiment();

export const addComment = async (req, res, next) => {
    try {
        const { comment, novel_id = null, novel_title, user_id } = req.body;
        const result = sentiment.analyze(comment);
        const { comparative } = result;
        const results = await Comment.create({
            comment,
            novel_title,
            user_id,
            sentiment_score: comparative,
        });
        return res.json({
            success: true,
            message: "Comment added",
            data: results,
        });
    } catch (err) {
        next(err);
    }
};
export const getComment = async (req, res, next) => {
    try {
        const { novel_id = null, novel_title } = req.body;
        console.log("novel_title", novel_title);
        const results = await Comment.findAll({
            where: { novel_title },
            order: [["created_at", "DESC"]],
        });
        console.log(results);
        return res.json({
            success: results ? true : false,
            message: results ? "Comments found" : "No comments found",
            data: results,
        });
    } catch (err) {
        next(err);
    }
};
