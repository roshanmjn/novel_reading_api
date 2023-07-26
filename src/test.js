import { Router } from "express";
import joi from "joi";
import { HttpException } from "./errors/index.js";
const router = Router();

router.post("/", (req, res) => {
    try {
        throw new HttpException(404, "asdasd");
    } catch (err) {
        throw err;
    }
});

export default router;
