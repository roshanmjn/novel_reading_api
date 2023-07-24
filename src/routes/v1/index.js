import { Router } from "express";

import novelRoute from "../../model/novels/novel.route.js";
import genreRoute from "../../model/genre/genre.route.js";
const router = Router();

router.use("/", (req, res, next) => {
    console.log("/v1");
    next();
});
router.use("/auth", () => {
    console.log("auth route");
});

router.use("/genre", genreRoute);

router.use("/", novelRoute);
export default router;
