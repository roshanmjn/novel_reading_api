import { Router } from "express";
import { HttpException } from "./errors/index.js";
import * as dotenv from "dotenv";
dotenv.config();
const router = Router();
import mysql from "mysql2/promise";
import catchAsync from "./utils/catchAsync.js";
router.post("/", async (req, res) => {
    const DB_NAME = process.env.DB_NAME;
    const DB_USER = process.env.DB_USER;
    const DB_PASSWORD = process.env.DB_PASSWORD;
    const DB_HOST = process.env.DB_HOST;
    const DB_DIALECT = process.env.DB_DIALECT;

    const sql = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
    });

    try {
        // Sample dataset of novels and their associated genres (dummy data)
        const sample_dataset = [
            {
                novel_id: "The Adventure Chronicles",
                genres: ["Adventure", "Action"],
            },
            { novel_id: "Mystery Mansion", genres: ["Mystery", "Thriller"] },
            { novel_id: "Romantic Escapade", genres: ["Romance"] },
            { novel_id: "Epic Fantasy Saga", genres: ["Fantasy"] },
        ];

        async function fetchAllNovels() {
            const query =
                "select nt.id as novel_id, group_concat(gnt.genre_id separator ',') as genre from novel_tbl nt left join genre_novel_tbl gnt on nt.id =gnt.novel_id group by nt.id,nt.title ;";
            const get_novel_with_matching_genre = await sql
                .query(query)
                .then((res) =>
                    res[0].map((row) => ({
                        novel_id: row.novel_id,
                        genre: row.genre.split(",").map((x) => Number(x)),
                    }))
                );

            return get_novel_with_matching_genre;
        }
        const dataset = await fetchAllNovels();
        async function fetch_novel_genre(novel_id) {
            const query = `select * from genre_novel_tbl where novel_id=${novel_id} order by genre_id`;
            const res = await sql.query(query);
            return res[0].map((row) => row.genre_id);
        }

        // Function to calculate Euclidean distance between two sets of genres
        function euclideanDistance(set1, set2) {
            //set 1 is dataset genre
            const allGenres = new Set([...set1, ...set2]);

            let sum = 0;
            for (const genre of allGenres) {
                const presence1 = set1.has(genre) ? 1 : 0;
                const presence2 = set2.has(genre) ? 1 : 0;
                sum += Math.pow(presence1 - presence2, 2);
            }

            return Math.sqrt(sum);
        }

        // k-Nearest Neighbors algorithm for genre-based recommendation using Euclidean distance
        function recommendNovelsByGenre(targetGenre, k, id) {
            // Calculate distances from targetGenre to all data points
            const distances = dataset
                .filter((x) => x.novel_id !== id)
                .map((data) => ({
                    novel_id: data.novel_id,
                    distance: euclideanDistance(
                        new Set(data.genre),
                        new Set(targetGenre)
                    ),
                }));
            console.log(distances);
            // Sort distances in ascending order
            distances.sort((a, b) => a.distance - b.distance);

            // Select the first 'k' neighbors
            const nearestNeighbors = distances.slice(0, k);

            // Return recommended novels
            const recommendedNovels = nearestNeighbors.map(
                (neighbor) => neighbor.novel_id
            );

            return recommendedNovels;
        }

        // Example usage

        const main_novel_id = req.body.novel_id || 1;
        const providedGenre = await fetch_novel_genre(main_novel_id); // Provided genre for the novel
        const k = 10; // Number of neighbors to consider for recommendation

        const recommendedNovels = recommendNovelsByGenre(
            providedGenre,
            k,
            main_novel_id
        );

        console.log(
            `Recommended Novels for id:${main_novel_id} = ${recommendedNovels}`
        );
        res.send(recommendedNovels);
    } catch (err) {
        throw err;
    }
});

export default router;
