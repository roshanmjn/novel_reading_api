import { load } from "cheerio";
import axios from "axios";
import { sqlConnection, sequelize } from "../../database/connection.js";
import { QueryTypes } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

const DB_NAME = process.env.DB_NAME;
const sql = await sqlConnection(DB_NAME);

async function getData(url) {
    try {
        const { data: html } = await axios.get(url, {
            timeout: 10000,
        });

        return html;
    } catch (err) {
        throw err;
    }
}

export const getAllGenres = async () => {
    try {
        const query = "select * from genre_tbl gt ;";
        const results = await sequelize.query(query, {
            type: QueryTypes.SELECT,
        });
        return results;
    } catch (err) {
        throw err;
    }
};

export const getGenreTitles = async (genre_title, page_index = 1) => {
    const isMatch = /^[A-Za-z0-9\-+_]+$/.test(genre_title);
    genre_title = isMatch ? genre_title : "Adventure";
    console.log(genre_title);

    parseInt(page_index);
    const isMatchNumber = /^\d+$/.test(page_index);
    const pageIndex = isMatchNumber || !isNaN(page_index) ? page_index : 1;

    const limit = 20;
    const startPageIndex = (pageIndex - 1) * limit;
    const endPageIndex = pageIndex * limit;
    const url = `https://freewebnovel.com/genres/${genre_title}/${pageIndex}.html`;
    console.log(url);

    const res = await getData(url);
    const $ = load(res);

    let genre = [];
    let latest_chapter_url = "";
    let title = "";
    let latest_chapter_number = "";
    let image_link = "";
    let url_parameter = "";
    const chaptersArray = [];
    const results = {};

    const lastPage = parseInt(
        $(
            ".row-box .col-content > div.pages > ul > li > a:nth-child(14)"
        ).text()
    );

    async function scrape() {
        return new Promise(async (resolve, reject) => {
            for (let i = pageIndex; i <= pageIndex; i++) {
                $(".row-box .col-content .ul-list1.ul-list1-2.ss-custom ").each(
                    (i, items) => {
                        $(items)
                            .find(".con  ")
                            .each((i, x) => {
                                // console.log($(x).html());
                                //FETCH TITLE:
                                $(x)
                                    .find(".tit a")
                                    .map((i, x) => {
                                        // console.log(title);
                                        title = $(x).attr("title");
                                    });

                                //TO FETCH GENRE LIST:
                                $(x)
                                    .find(".desc div:nth-child(2) .right a")
                                    .each((i, z) => {
                                        genre.push($(z).text());
                                    });

                                //TO FIND IMAGE:
                                const image_link = $(x)
                                    .find(".pic a img")
                                    .attr("src");

                                //TO FETCH NOVEL LASTEST CHAPTER URL:
                                $(x)
                                    .find(".desc div:nth-child(3) .right a")
                                    .map(
                                        (i, za) =>
                                            (latest_chapter_url =
                                                $(za).attr("href"))
                                    );
                                //TO  URL parameter:
                                $(x)
                                    .find(".desc div:nth-child(3) .right a")
                                    .map(
                                        (i, za) =>
                                            (url_parameter = $(za)
                                                .attr("href")
                                                .split("/")[1])
                                    );

                                // TO FETCH LATEST NOVEL CHAPTER NUMBER:
                                $(x)
                                    .find(".right a span ")
                                    .each(
                                        (i, x) =>
                                            (latest_chapter_number = Number(
                                                $(x).text().split(" ")[0]
                                            ))
                                    );

                                chaptersArray.push({
                                    title,
                                    genre,
                                    image_link,
                                    url_parameter,
                                    latest_chapter_url,
                                    latest_chapter_number,
                                });
                                genre = [];
                            });
                    }
                );
            }
            resolve(chaptersArray);
        });
    }

    const novelChapters = await scrape();

    if (pageIndex < parseInt(lastPage)) {
        results.next = { page: pageIndex + 1, limit: limit };
    }
    if (startPageIndex > 0) {
        if (!(pageIndex >= parseInt(lastPage))) {
            results.previous = { page: pageIndex - 1, limit: limit };
        } else
            results.previous = { page: parseInt(lastPage) - 1, limit: limit };
    }
    results.results = chaptersArray;
    results.last_page = lastPage;
    results.current_page = startPageIndex;
    return results;
};
