import * as novelService from "./novel.service.js";
import catchAsync from "../../utils/catchAsync.js";
export const getMostPopularNovelsData = async (req, res, next) => {
    try {
        const data = await novelService.mostPopularNovelsUrlData;

        return res.json(data);
    } catch (err) {
        next(err);
    }
};

export const getNovelWithTitle = async (req, res, next) => {
    try {
        const data = await novelService.getNovelWithTitle(
            req.params.novelTitle,
            parseInt(req.params.pageIndex?.split(".")[0])
        );

        console.log("novel controller Data:", data.results.length);

        return res.json(data);
    } catch (err) {
        next(err);
    }
};
export const getGenreData = async (req, res, next) => {
    try {
        const data = await novelService.getAllGenres;
        // console.log(data);
        return res.json(data);
    } catch (err) {
        next(err);
    }
};
export const getGenreWithTitle = async (req, res, next) => {
    try {
        const data = await novelService.getGenreTitles(
            req.params.genreTitle,
            parseInt(req.params.pageIndex?.split(".")[0])
        );
        // console.log("controller Data:", data.results.length);

        return res.json(data);
    } catch (err) {
        next(err);
    }
};

export const getChapterData = async (req, res, next) => {
    try {
        // console.log(req.params);
        const data = await novelService.getChapter(
            req.params.novelTitle,
            parseInt(req.params.number)
        );
        // console.log("chapter data:", data.length);
        return res.json({ success: true, data });
    } catch (err) {
        next(err);
    }
};

export const getKnnRecommendationData = async (req, res, next) => {
    try {
        const data = await novelService.getKnnRecommendation(
            req.body?.novel_id
        );
        return res.json({ success: true, data });
    } catch (err) {
        next(err);
    }
};
