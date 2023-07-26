import { Router } from "express";

import novelRoute from "../../model/novels/novel.route.js";
import genreRoute from "../../model/genre/genre.route.js";
import authRoute from "../../model/users/auth.route.js";
import userRoute from "../../model/users/user.route.js";
const router = Router();

router.use("/", (req, res, next) => {
    console.log("/v1");
    next();
});
router.use("/auth", authRoute);

router.use("/genre", genreRoute);
router.use("/user", userRoute);
router.use("/novel", novelRoute);
export default router;
