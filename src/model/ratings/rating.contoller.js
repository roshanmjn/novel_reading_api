import { Rating } from "./rating.model.js";
import { currentDate } from "../../utils/get.expirydate.js";
import { Op } from "sequelize";
import responseHandler from "../../utils/responseHandler.js";

export const get_rating = async (req, res, next) => {
    const { user_id, novel_title } = req.body;
    try {
        const find_rating = await Rating.findOne({
            where: {
                [Op.and]: [
                    { user_id: user_id },
                    {
                        novel_title: novel_title,
                    },
                ],
            },
        });
        return res.json(responseHandler(find_rating));
    } catch (err) {
        next(err);
    }
};

export const add_rating = async (req, res, next) => {
    try {
        const { user_id, novel_title, rating } = req.body;
        const add_rating = await Rating.create({
            user_id: user_id,
            novel_title: novel_title,
            rating: rating,
            created_at: currentDate(),
            updated_at: currentDate(),
        });
        return res.json(responseHandler(add_rating));
    } catch (err) {
        next(err);
    }
};

export const remove_rating = async (req, res, next) => {
    try {
        const { user_id, novel_title } = req.body;
        const delete_bookmark = await Rating.destroy({
            where: {
                [Op.and]: [
                    { user_id: user_id },
                    {
                        novel_title: novel_title,
                    },
                ],
            },
        });
        return res.json(
            responseHandler({
                message: delete_bookmark
                    ? `Novel id:${novel_title} rating removed for User:${user_id}`
                    : `Novel id:${novel_title} for User:${user_id} Not Found`,
            })
        );
    } catch (err) {
        next(err);
    }
};
