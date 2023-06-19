import * as novelService from "./novel.service.js";

export const getMostPopularNovelsData = async (req, res, next) => {
    try {
        const data = await novelService.mostPopularNovelsUrlData;
        console.log(data.length);
        return res.json(data);
    } catch (err) {
        next(err);
    }
};
