import * as novelService from "./scrape.novel.service.js";

export const scrapeGetMostPopularNovelsData = async (req, res, next) => {
    try {
        console.log("scrape controller Mostpop");
        const data = await novelService.scrapeMostPopularNovelsUrlData();

        return res.json(data);
    } catch (err) {
        next(err);
    }
};

export const scrapeGetNovelWithTitle = async (req, res, next) => {
    try {
        const data = await novelService.scrapeGetGenreTitles(
            //getNovelWithTitle(
            req.params.novelTitle,
            parseInt(req.params.pageIndex?.split(".")[0])
        );

        console.log("novel controller Data:", data.results.length);

        return res.json(data);
    } catch (err) {
        next(err);
    }
};
export const scrapeGetGenreData = async (req, res, next) => {
    try {
        const data = await novelService.scrapeGetAllGenres(); //getAllGenres;
        // console.log(data);
        return res.json(data);
    } catch (err) {
        next(err);
    }
};
export const scrapeGetGenreWithTitle = async (req, res, next) => {
    try {
        const data = await novelService.getGenreTitles(
            req.params.genreTitle,
            parseInt(req.params.pageIndex?.split(".")[0])
        );
        // console.log("controllerData:", data.results.length);

        return res.json(data);
    } catch (err) {
        next(err);
    }
};

export const scrapeGetChapterData = async (req, res, next) => {
    try {
        // console.log(req.params);
        const data = await novelService.scrapeGetChapter(
            //getChapter(
            req.params.novelTitle,
            parseInt(req.params.number)
        );
        // console.log("chapter data:", data.length);
        return res.json({ success: true, data });
    } catch (err) {
        next(err);
    }
};
