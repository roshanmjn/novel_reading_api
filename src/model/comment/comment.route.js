import { Router } from "express";
import { commentController } from "../../controller/index.js";
const router = Router();

router.use("/", (req, res, next) => {
    console.log("/comment");
    next();
});

//FOR COMMENT
router.post("/", commentController.getComment);
router.post("/add", commentController.addComment);

export default router;
