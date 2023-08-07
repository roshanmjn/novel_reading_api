import { Novel } from "../model/novels/novel.model.js";
import { Genre } from "../model/genre/genre.model.js";
import { Genre_Novel } from "../model/genre_novel/genre_novel.model.js";
import { User } from "../model/users/user.model.js";
import { Bookmark } from "../model/bookmarks/bookmark.model.js";
import { RefreshToken } from "../model/tokens/refreshToken.model.js";
import { Rating } from "../model/ratings/rating.model.js";

export const syncModels = async () => {
    const options = { alter: true };
    await Genre.sync(options);
    await Novel.sync(options);
    await Genre_Novel.sync(options);
    await User.sync(options);
    await Bookmark.sync(options);
    await RefreshToken.sync(options);
    await Rating.sync(options);
};
