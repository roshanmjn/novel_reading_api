import { Router } from "express";
import { authTokenVerification } from "../../middleware/token.verification.js";
import { bookmarkController } from "../../controller/index.js";
const router = Router();

router.use("/", authTokenVerification, (req, res, next) => {
    console.log("/user");
    next();
});
router.get("/bookmark", bookmarkController.get_bookmark);
router.post("/addbookmark", bookmarkController.add_bookmark);
router.post("/removebookmark", bookmarkController.remove_bookmark);
export default router;
