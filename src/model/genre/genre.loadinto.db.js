import { Genre } from "./genre.model.js";
import { Novel } from "../novels/novel.model.js";
import { Genre_Novel } from "../genre_novel/genre_novel.model.js";
import {
    getAllGenres,
    mostPopularNovelsUrlData,
} from "../novels/novel.service.js";

export const scrapeAndUpdate = async () => {
    console.log("Scraping Started");
    try {
        const genres = await getAllGenres;
        genres.map(async (data, idx) => {
            const [found, created] = await Genre.findOrCreate({
                where: { title: data.title },
                defaults: {
                    title: data.title,
                    description: data.description,
                    active: true,
                    link: data.link,
                },
            });
            if (found) {
                if (found.link !== data.link) {
                    await Genre.update({ link: data.link });
                }
                if (found.description !== data.description) {
                    await Genre.update({ description: data.description });
                }
            }
        });
    } catch (err) {
        throw err;
    }

    try {
        const novels = await mostPopularNovelsUrlData;
        novels.map(async (data, idx) => {
            const findNovelInDB = await Novel.findOne({
                where: { title: data.title },
            });

            if (!findNovelInDB) {
                const create = await Novel.create({
                    title: data.title,
                    chapters: data.chapters,
                    status: "ongoing",
                    active: 1,
                    image_link: data.img_link,
                    link: data.link,
                });

                data.genre.map(async (genre) => {
                    const getGenreId = await Genre.findOne({
                        where: { title: genre },
                    });
                    const insert = await Genre_Novel.create({
                        genre_id: getGenreId.id,
                        novel_id: create.id,
                    });
                });
            }
            // console.log(findNovelInDB.toJSON());

            if (
                findNovelInDB &&
                findNovelInDB.chapters !== Number(data.chapters)
            ) {
                console.log(
                    ` UPDATED::${data.title}::${data.chapters}::${findNovelInDB.chapters}`
                );
                const update = await Novel.update(
                    {
                        chapters: data.chapters,
                        updated_at: Date.now(),
                    },
                    { where: { title: data.title } }
                );
            }
        });
        console.log("Scraping Ended");
        return;
    } catch (err) {
        throw err;
    }
};
