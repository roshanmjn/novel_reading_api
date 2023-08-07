import { Bookmark } from "../bookmarks/bookmark.model.js";
import { currentDate } from "../../utils/get.expirydate.js";
import { Op } from "sequelize";
import responseHandler from "../../utils/responseHandler.js";
import { ForeignKeyConstraintError } from "sequelize";

export const get_bookmark = async (req, res, next) => {
    const { user_id, novel_id } = req.body;
    try {
        const find_bookmark = await Bookmark.findAll({
            where: { user_id: user_id },
        });
        return res.json(responseHandler(find_bookmark));
    } catch (err) {
        next(err);
    }
};

export const add_bookmark = async (req, res, next) => {
    try {
        const { user_id, novel_id } = req.body;
        const add_bookmark = await Bookmark.create({
            user_id: user_id,
            novel_id: novel_id,
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
        const { user_id, novel_id } = req.body;
        const delete_bookmark = await Bookmark.destroy({
            where: {
                [Op.and]: [
                    { user_id: user_id },
                    {
                        novel_id: novel_id,
                    },
                ],
            },
        });
        return res.json(
            responseHandler({
                message: delete_bookmark
                    ? `Novel id:${novel_id} bookmark removed for User:${user_id}`
                    : `Novel id:${novel_id} for User:${user_id} Not Found`,
            })
        );
    } catch (err) {
        next(err);
    }
};
