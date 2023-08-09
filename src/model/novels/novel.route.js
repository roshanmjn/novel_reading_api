import { Router } from "express";
import { novelController } from "../../controller/index.js";
const router = Router();

router.use("/", (req, res, next) => {
    console.log("/novels");
    next();
});

//FOR NOVEL
router.get("/most-popular", novelController.getMostPopularNovelsData);

router.get("/:novelTitle/chapter-:number", novelController.getChapterData);

router.get("/:novelTitle/:pageIndex?", novelController.getNovelWithTitle);

router.post("/knn", novelController.getKnnRecommendationData);

export default router;
