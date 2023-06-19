import { Router } from "express";
import * as novelController from "./novel.controller.js";
const router = Router();
router.use("/", (req, res, next) => {
    console.log("/novels");
    next();
});
router.post("/most-popular", novelController.getMostPopularNovelsData);

export default router;
