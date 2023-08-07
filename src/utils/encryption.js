import jwt from "jsonwebtoken";
import { accessTokenExpire, refreshTokenExpire } from "./get.expirydate.js";
/**
 * @typedef {'auth' | 'refresh'} TokenUse
 */
/**
 * Sign a JWT token.
 * @param {'auth' | 'refresh'} use - The purpose of the token ('auth' or 'refresh').
 */
export const jwtSign = (use, payload) => {
    const tokenType = use === "refresh" ? "refresh" : "auth";
    const options = {
        expiresIn:
            tokenType === "auth" ? accessTokenExpire : refreshTokenExpire,
    };
    return jwt.sign(
        {
            id: payload.id,
            email: payload.email,
        },
        tokenType === "auth"
            ? process.env.AUTH_SECRET_KEY
            : process.env.REFRESH_SECRET_KEY,
        options
    );
};

export const decodeAuthToken = (token) => {
    return jwt.verify(token, process.env.AUTH_SECRET_KEY);
};
export const decodeRefreshToken = (token) => {
    return jwt.verify(token, process.env.REFRESH_SECRET_KEY);
};
