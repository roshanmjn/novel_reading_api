import HttpException from "../errors/HttpException.js";
import { decodeAuthToken, decodeRefreshToken } from "../utils/encryption.js";
import { RefreshToken } from "../model/tokens/refreshToken.model.js";
import { jwtSign } from "../utils/encryption.js";
export const authTokenVerification = (req, res, next) => {
    const auth = req.cookies?.auth;
    if (!auth) throw new HttpException(401, "Login for access.");
    try {
        decodeAuthToken(auth);
        next();
    } catch (err) {
        throw new HttpException(401, "Invalid auth token");
    }
};

export const refreshTokenVerification = async (req, res, next) => {
    const user_id = req.body.user_id;
    if (!user_id) {
        throw new HttpException(401, "Login for access.");
    }
    try {
        const tokenFromDB = await RefreshToken.findOne({
            where: { user_id: user_id },
        }).then((data) => {
            return data.token;
        });

        const result = decodeRefreshToken(tokenFromDB);

        const newAccessToken = jwtSign("auth", {
            id: result.id,
            email: result.email,
        });
        res.cookie("auth", newAccessToken, {
            httpOnly: false,
            secure: false,
            maxAge: 10 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
            status: "ok",
            statusCode: 200,
            message: "New access token created",
            token: newAccessToken,
        });
    } catch (err) {
        next(err);
    }
};
