import { Router } from "express";
import { authTokenVerification } from "../../middleware/token.verification.js";
import { bookmarkController } from "../../controller/index.js";
import { ratingController } from "../../controller/index.js";
const router = Router();

router.use("/", authTokenVerification, (req, res, next) => {
    console.log("/user");
    next();
});
router.post("/bookmark", bookmarkController.get_bookmark);
router.post("/onebookmark", bookmarkController.get_one_bookmark);
router.post("/addbookmark", bookmarkController.add_bookmark);
router.post("/removebookmark", bookmarkController.remove_bookmark);
router.post("/rating", ratingController.get_rating);
router.post("/addrating", ratingController.add_rating);
router.post("/removerating", ratingController.remove_rating);

export default router;
