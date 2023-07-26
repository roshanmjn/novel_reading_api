import HttpException from "../errors/HttpException.js";
import { decodeAuthToken, decodeRefreshToken } from "../utils/encryption.js";
import { RefreshToken } from "../model/tokens/refreshToken.model.js";
import { jwtSign } from "../utils/encryption.js";
import { accessTokenExpire, expireIn } from "../utils/get.expirydate.js";
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
        console.log(result);
        const newAccessToken = jwtSign("auth", {
            id: result.id,
            email: result.email,
        });
        res.cookie("auth", newAccessToken, {
            httpOnly: true,
            secure: true,
            maxAge: expireIn(accessTokenExpire),
        });
        return res
            .status(200)
            .json({
                status: "ok",
                statusCode: 200,
                message: "New access token created",
                token: newAccessToken,
            });
    } catch (err) {
        next(err);
    }
    const output = {
        id: 1,
        email: "a@a.com",
        iat: 1690285831,
        exp: 1691149831,
    };
    // res.send(result);
    //  const refresh = req.cookies?.refresh;
    //  if (!refresh) throw new HttpException(403, "Login for access.");

    //      decodeRefreshToken(refresh).then((data) => {})
    //    //   next();
};
