import { Bookmark } from "./bookmark.model.js";
import { currentDate } from "../../utils/get.expirydate.js";
import { Op, QueryTypes } from "sequelize";
import responseHandler from "../../utils/responseHandler.js";

export const get_bookmark = async (req, res, next) => {
    const { user_id } = req.body;
    console.log("user_id:", user_id);
    try {
        const find_bookmark = await Bookmark.findAll({
            where: { user_id: user_id },
        });
        return res.json(responseHandler(find_bookmark));
    } catch (err) {
        next(err);
    }
};
export const get_one_bookmark = async (req, res, next) => {
    const { user_id, novel_title } = req.body;
    console.log("user_id:", user_id);
    try {
        const find_bookmark = await Bookmark.findOne({
            where: {
                [Op.and]: [
                    { user_id: user_id },
                    {
                        novel_title: novel_title,
                    },
                ],
            },
        });
        return res.json(responseHandler(find_bookmark));
    } catch (err) {
        next(err);
    }
};

export const add_bookmark = async (req, res, next) => {
    try {
        const { user_id, novel_title } = req.body;
        const add_bookmark = await Bookmark.create({
            user_id: user_id,
            novel_title: novel_title,
            created_at: currentDate(),
            updated_at: currentDate(),
        });
        return res.json(responseHandler(add_bookmark));
    } catch (err) {
        next(err);
    }
};

export const remove_bookmark = async (req, res, next) => {
    try {
        const { user_id, novel_title } = req.body;
        console.log({ user_id, novel_title });
        const delete_bookmark = await Bookmark.destroy({
            where: {
                [Op.and]: [
                    { user_id: user_id },
                    {
                        novel_title: novel_title,
                    },
                ],
            },
        });
        return res.json({
            user_id,
            novel_title,
            message: delete_bookmark
                ? `Deleted operation success!`
                : `Delete operation failed! Not found!`,
            success: delete_bookmark ? true : false,
            status: 200,
        });
    } catch (err) {
        next(err);
    }
};
