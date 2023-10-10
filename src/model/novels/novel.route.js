import { Router } from "express";
import { novelController } from "../../controller/index.js";

import { scrapeGetMostPopularNovelsData } from "./scraping/scrape.novel.controller.js";
const router = Router();

router.use("/", (req, res, next) => {
    console.log("/novel");
    next();
});

//FOR NOVEL
router.get("/most-popular", novelController.getMostPopularNovelsData);

router.get("/:novelTitle/chapter-:number", novelController.getChapterData);

router.get("/:novelTitle/:pageIndex?", novelController.getNovelWithTitle);

router.post("/knn", novelController.getKnnRecommendationData);

router.post("/rating", novelController.getRatingRecommendationData);

router.post("/test", scrapeGetMostPopularNovelsData);

export default router;
