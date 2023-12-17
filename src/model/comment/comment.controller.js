import { sqlConnection, sequelize } from "../../database/connection.js";
import { Comment } from "./comment.model.js";
import responseHandler from "../../utils/responseHandler.js";
import Sentiment from "sentiment";
import * as dotenv from "dotenv";
//sentiment
import aposToLexForm from "apos-to-lex-form";
import sentiment_analyze from "../../sentiment/index.js";
import SpellCorrector from "spelling-corrector";
import SW from "stopword";
const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

dotenv.config();
const DB_NAME = process.env.DB_NAME;

// const sql = await sqlConnection(DB_NAME);
// const sentiment = new Sentiment();

export const addComment = async (req, res, next) => {
    try {
        // const { comment, novel_id = null, novel_title, user_id } = req.body;
        // const result = sentiment.analyze(comment);
        // const { comparative } = result;

        // *** sentiment analyze start

        /* NORMALIZATION */
        // negation handling
        // convert apostrophe=connecting words to lex form
        const { comment, novel_id = null, novel_title, user_id } = req.body;
        const lexedReview = aposToLexForm(comment);

        // casing
        const casedReview = lexedReview.toLowerCase();

        // removing
        const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\s]+/g, "");

        // tokenize review
        const { WordTokenizer } = sentiment_analyze;
        const tokenizer = new WordTokenizer();
        const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);

        // spell correction
        tokenizedReview.forEach((word, index) => {
            tokenizedReview[index] = spellCorrector.correct(word);
        });

        // remove stopwords
        const filteredReview = SW.removeStopwords(tokenizedReview);

        const { SentimentAnalyzer, PorterStemmer } = sentiment_analyze;
        const analyzer = new SentimentAnalyzer(
            "English",
            PorterStemmer,
            "afinn"
        );

        const comparative = analyzer.getSentiment(filteredReview);
        // *** sentiment analyze stop

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
