import { Router } from "express";
import { novelController } from "../../controller/index.js";
const router = Router();

router.use("/", (req, res, next) => {
    console.log("/genre");
    next();
});

//FOR GENRE
router.get("/", novelController.getGenreData);
router.get("/:genreTitle/:pageIndex?", novelController.getGenreWithTitle);

export default router;
