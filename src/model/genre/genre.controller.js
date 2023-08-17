import * as genreService from "./genre.service.js";
import catchAsync from "../../utils/catchAsync.js";

export const getGenreData = async (req, res, next) => {
    try {
        const data = await genreService.getAllGenres();
        // console.log(data);
        return res.json(data);
    } catch (err) {
        next(err);
    }
};
export const getGenreWithTitle = async (req, res, next) => {
    try {
        const data = await genreService.getGenreTitles(
            req.params.genreTitle,
            parseInt(req.params.pageIndex?.split(".")[0])
        );
        // console.log("controllerData:", data.results.length);

        return res.json(data);
    } catch (err) {
        next(err);
    }
};
