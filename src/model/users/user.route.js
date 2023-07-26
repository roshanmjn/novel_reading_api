import { Router } from "express";
import { authTokenVerification } from "../../middleware/token.verification.js";
const router = Router();

router.use("/", authTokenVerification, (req, res, next) => {});

export default router;
