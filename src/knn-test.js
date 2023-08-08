import { Router } from "express";
import { HttpException } from "./errors/index.js";
import * as dotenv from "dotenv";
dotenv.config();
const router = Router();
import mysql from "mysql2/promise";
import catchAsync from "./utils/catchAsync.js";
router.post("/", (req, res) => {
    try {
        throw new HttpException(404, "asdasd");
    } catch (err) {
        throw err;
    }
});

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
    async function euclidean_distance(array1, array2) {
        if (array1.length !== array2.length) {
            throw new Error("Arrays must have the same length");
        }
        let sum = 0;
        for (let i = 0; i < array1.length; i++) {
            sum += Math.pow(array1[i] - array2[i], 2);
        }

        return 1 / (1 + Math.sqrt(sum));
        // return Math.sqrt(sum);
    }
    // get all genre
    async function fetch_all_genre() {
        const query = "select * from genre_tbl";
        const res = await sql.query(query);
        return res[0].map((row) => row.id);
    }
    async function fetch_novel_genre(novel_id) {
        const query = `select * from genre_novel_tbl where novel_id=${novel_id} order by genre_id`;
        const res = await sql.query(query);
        return res[0].map((row) => row.genre_id);
    }

    async function convert_genre_into_vector(genre_array) {
        const all_genres = await fetch_all_genre();
        return all_genres?.map((item) =>
            genre_array?.indexOf(item) !== -1 ? 1 : 0
        );
    }

    async function get_matching_novels_with_genre(current_id) {
        const main_genre = await fetch_novel_genre(current_id);
        // get all novels with their genre
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

        // collect novels with genre matching with main genre
        const matching = [];
        await Promise.all(
            get_novel_with_matching_genre
                ?.filter((item) => item.novel_id !== current_id)
                .map(async (x) => {
                    for (const num of x.genre) {
                        if (main_genre.indexOf(num) >= 0) {
                            const genre_vector =
                                await convert_genre_into_vector(x.genre);
                            matching.push({
                                novel_id: x.novel_id,
                                genre: genre_vector,
                            });
                        }
                    }
                })
        );

        // calculate euclidean distance
        const main_genre_vector = await convert_genre_into_vector(main_genre);
        const distance = await Promise.all(
            matching.map(async (x) => {
                const ed = await euclidean_distance(main_genre_vector, x.genre);
                return {
                    novel_id: x.novel_id,
                    distance: ed,
                    // genre: x.genre,
                };
            })
        );
        return distance;
    }
    get_matching_novels_with_genre(5).then((res) => {
        // const sorted = res.sort((a, b) => {
        //     return a.distance - b.distance;
        // });
        console.log(res);
        // res.forEach((x) => console.log(x));
    });
} catch (err) {
    throw err;
}

export default router;
