import { Novel } from "../model/novels/novel.model.js";
import { Genre } from "../model/genre/genre.model.js";
import { Genre_Novel } from "../model/genre_novel/genre_novel.model.js";

export const syncModels = async () => {
    const options = { alter: true };
    await Genre.sync(options);
    await Novel.sync(options);
    await Genre_Novel.sync(options);
};
