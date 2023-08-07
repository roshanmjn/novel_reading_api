import { User } from "../../model/users/user.model.js";
import { RefreshToken } from "../../model/tokens/refreshToken.model.js";
import responseHandler from "../../utils/responseHandler.js";
import { HttpException } from "../../errors/index.js";
import { jwtSign } from "../../utils/encryption.js";
import {
    currentDate,
    expireIn,
    refreshTokenExpire,
} from "../../utils/get.expirydate.js";

export const signupController = async (req, res, next) => {
    const {
        first_name,
        last_name,
        username,
        email,
        password,
        confirm_password,
    } = req.body;
    const role = 1;
    const active = 1;

    try {
        const findUser = await User.findOne({
            where: {
                email: email,
            },
        });
        if (findUser) {
            return res.status(200).json({
                status: "conflict",
                statusCode: 200,
                message: "User account already exist !",
            });
        }
        const createUser = await User.create({
            first_name,
            last_name,
            username,
            email,
            password,
            confirm_password,
            role,
            active,
        });
        return res.json(responseHandler(createUser));
    } catch (err) {
        next(err);
    }
};

export const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const login = await User.findOne({
            where: {
                email: email,
            },
        }).then((user) => user?.dataValues);

        if (!login) throw new HttpException(401, "Invalid Credentials");

        const isCorrectPassword = password === login.password;
        if (!isCorrectPassword)
            throw new HttpException(401, "Invalid Credentials!");

        //CREATE ACCESS TOKEN AND STORE IN COOKIE
        req.user_id = login.id;
        const accessToken = jwtSign("auth", {
            id: login.id,
            email: login.email,
        });
        res.cookie("auth", accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 20 * 60 * 1000,
        });
        //CREATE REFRESH TOKEN AND STORE IN DATABASE
        const refreshToken = jwtSign("refresh", {
            id: login.id,
            email: login.email,
        });
        const checkPreviousRefToken = await RefreshToken.findOne({
            where: { user_id: login.id },
        });
        if (!checkPreviousRefToken) {
            await RefreshToken.create({
                user_id: login.id,
                token: refreshToken,
                revoked: 0,
                created_at: currentDate(),
                expires_at: expireIn(refreshTokenExpire),
                updated_at: currentDate(),
            });
        }

        await RefreshToken.update(
            {
                token: refreshToken,
                expires_at: expireIn(refreshTokenExpire),
                updated_at: currentDate(),
            },
            { where: { user_id: login.id } }
        );

        return res.status(200).json(
            responseHandler({
                id: login.id,
                first_name: login.first_name,
                last_name: login.last_name,
                email: login.email,
                role: login.role,
                active: login.active,
                access_token: accessToken,
                refreshToken,
            })
        );
    } catch (err) {
        next(err);
    }
};
