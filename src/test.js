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
        // console.log("a1:", array1, "a2:", array2);
        let sum = 0;
        for (let i = 0; i < array1.length; i++) {
            sum += Math.pow(array1[i] - array2[i], 2);
        }

        // return 1 / (1 + Math.sqrt(sum));
        return Math.sqrt(sum);
    }

    async function novel_genre_array(novel_id) {
        const query = "select * from genre_tbl";
        const genre = await sql.query(query).then((res) => {
            return res[0].map((row) => {
                return row.id;
            });
        });

        const query2 = `select * from genre_novel_tbl where novel_id=${novel_id} order by genre_id`;
        const novel_genre = await sql.query(query2).then((res) =>
            res[0].map((row) => {
                return row.genre_id;
            })
        );

        return genre?.map((item) => {
            return novel_genre.indexOf(item) !== -1 ? 1 : 0;
        });
    }

    async function convert_into_vector(array) {
        const query = "select * from genre_tbl";
        const genre = await sql.query(query).then((res) => {
            return res[0].map((row) => {
                return row.id;
            });
        });
        return genre?.map((item) => {
            return array.indexOf(item) !== -1 ? 1 : 0;
        });
    }

    async function novel_distances_with_matching_genre(novel_id) {
        const main_genre = await novel_genre_array(6);
        convert_into_vector(main_genre).then((res) => console.log(res));
        const query =
            "select nt.id as novel_id, group_concat(gnt.genre_id separator ',') as genre from novel_tbl nt left join genre_novel_tbl gnt on nt.id =gnt.novel_id group by nt.id,nt.title ;";
        const get_novel_with_matching_genre = await sql.query(query).then(
            (
                res //{novel_id:1,genre:[33,1]}
            ) =>
                res[0].map((row) => {
                    return {
                        novel_id: row.novel_id,
                        genre: row.genre.split(",").map((x) => {
                            return Number(x);
                        }),
                    };
                })
        );
        const matching = [];
        // console.log(get_novel_with_matching_genre);
        const convert = await Promise.all(
            get_novel_with_matching_genre.map(async (x) => {
                for (const num of x.genre) {
                    if (main_genre.indexOf(num) >= 0) {
                        const genresVector = await convert_into_vector(x.genre);
                        matching.push({
                            novel_id: x.novel_id,
                            genre: genresVector,
                        });
                    }
                }
            })
        );
        return matching;

        const distance = [];
        // const array = await Promise.all(
        //     get_novel_with_matching_genre.map(async (item) => {
        //         // if (item.novel_id === 1) return;
        //         if (
        //             item.genre.every((item) => main_genre.includes(item)) &&
        //             item.genre.length === main_genre.length
        //         )
        //             return;
        //         const euc_distance = await euclidean_distance(
        //             main_genre,
        //             await novel_genre_array(item.novel_id)
        //         );
        //         const obj = {
        //             novel_id: item.novel_id,
        //             distance: Math.floor(euc_distance * 100) / 100,
        //             // distance: euc_distance ,
        //         };
        //         distance.push(obj);

        //         return distance;
        //     })
        // );

        // return convert_genre_into_vector;
    }
    novel_distances_with_matching_genre().then((res) => {
        // console.log(res);
        res.forEach((x) => console.log(x.novel_id));
    });
    // const z = await get_novels_with_mathcing_genre();
    // z.sort((a, b) => {
    //     return b.distance - a.distance;
    // });
    // const filtered = z.filter(function (currentValue, index) {
    //     return index < 10;
    // });

    // const test = b.filter((x) => {
    //     return x.genre.some((z) => {
    //         if (a.indexOf(z) >= 0) {
    //             return { id: z.id, genre: z.genre };
    //         }
    //     });
    // });
} catch (err) {
    throw err;
}

export default router;
