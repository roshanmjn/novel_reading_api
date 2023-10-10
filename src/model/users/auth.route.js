import { Router } from "express";
import {
    registerValidator,
    loginValidator,
} from "../../middleware/auth.validation.js";
import {
    signupController,
    loginController,
    logoutController,
} from "./auth.controller.js";
import { refreshTokenVerification } from "../../middleware/token.verification.js";
const router = Router();

router.use("/", (req, res, next) => {
    console.log("/auth");
    next();
});

router.post("/signup", registerValidator, signupController);
router.post("/login", loginValidator, loginController);
router.post("/logout", logoutController);
router.post("/refresh", refreshTokenVerification);

export default router;
