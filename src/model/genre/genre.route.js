import { Router } from "express";
import { genreController } from "../../controller/index.js";
const router = Router();

router.use("/", (req, res, next) => {
    console.log("/genre");
    next();
});

//FOR GENRE
router.get("/", genreController.getGenreData);
router.get("/:genreTitle/:pageIndex?", genreController.getGenreWithTitle);

export default router;
