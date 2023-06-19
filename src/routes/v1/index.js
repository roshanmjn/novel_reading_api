import { Router } from "express";

import novelRoute from "../../model/novels/novel.route.js";
const router = Router();

router.use("/", (req, res, next) => {
    console.log("/v1");
    next();
});
router.use("/auth", () => {
    console.log("auth route");
});
router.use("/novels", novelRoute);

router.use("/genre", () => {
    console.log("genre route");
});
router.use("/chapters", () => {
    console.log("chapters route");
});
export default router;
