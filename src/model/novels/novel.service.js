import axios from "axios";
import { load } from "cheerio";
import { sqlConnection, sequelize } from "../../database/connection.js";
import { QueryTypes } from "sequelize";
import catchAsync from "../../utils/catchAsync.js";
import * as dotenv from "dotenv";
dotenv.config();
const DB_NAME = process.env.DB_NAME;

const sql = await sqlConnection(DB_NAME);

const novelHomepage = "https://freewebnovel.com/";
const mostPopularNovelsUrl = "https://freewebnovel.com/most-popular-novels/";

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

export const getAuthor = async (novel_title) => {
    const title = novel_title || "keyboard-immortal-novel";
    const url = `https://freewebnovel.com/${title}.html`;
    console.log(url);
    let path = ".txt span[title='Author']";
    const res = await getData(url);
    const $ = load(res);
    let author =
        $(path)
            .next(".right")
            .text()
            .split(",")
            .map((x) => x.trim()) || [];

    return author;
};

const novelData = [];

export const mostPopularNovelsUrlData = async () => {
    try {
        const query =
            "select nt.id,nt.title, group_concat(gt.title  separator ',') as genre, nt.url_parameter,nt.chapters,nt.image_link,nt.link from novel_tbl nt left join genre_novel_tbl gnt on nt.id =gnt.novel_id left join genre_tbl gt on gt.id =gnt.genre_id group by nt.id,nt.title ;";
        const results = await sequelize.query(query, {
            type: QueryTypes.SELECT,
        });
        return results;
    } catch (err) {
        throw err;
    }
};

export const getNovelWithTitle = async (novel_title, page_index) => {
    // novel_title = "keyboard-immortal-novel";
    const pageIndex =
        page_index == null ||
        page_index === 0 ||
        typeof page_index !== "number" ||
        isNaN(page_index)
            ? 1
            : page_index;
    const limit = 40;
    const startPageIndex = (pageIndex - 1) * limit; //40
    const endPageIndex = pageIndex * limit; //80

    const url = `https://freewebnovel.com/${novel_title}/${pageIndex}.html`;
    const res = await getData(url);
    console.log(url);
    const $ = load(res);
    const genre = [];
    const author = [];
    var status = "";
    var title = "";
    var description = "";
    const chaptersArray = [];
    const results = {};
    let lastPage = 0;

    $(".row-box > .col-content").each((_, items) => {
        $(items)
            .find(".m-book1 > div")
            .each((_, x) => {
                // console.log($(x).html());
                // FETCH AUTHOR NAME:
                $(x)
                    .find(".m-imgtxt .txt div:nth-child(2) .right a")
                    .each((i, y) => (author[i] = $(y).text()));
                // FETCH GENRE LIST:
                $(x)
                    .find(".m-imgtxt .txt div:nth-child(3) .right a")
                    .each((i, z) => (genre[i] = $(z).text()));
                // FETCH NOVEL STATUS:
                $(x)
                    .find(".m-imgtxt .txt div:nth-child(6) .right .s1.s2 a")
                    .map((i, za) => (status = $(za).text()));
                //FETCH TITLE:
                $(x)
                    .find(".m-desc .tit")
                    .map((i, x) => (title = $(x).text()));
                //FETCH NOVEL DESCRIPTION:
                $(x)
                    .find(".m-desc .txt >.inner ")
                    .each(
                        (i, x) =>
                            (description = description.concat($(x).text()))
                    );
            });
    });

    //GET LAST PAGE FOR THE LATEST CHAPTER NUMBER
    //AND FETCH ALL CHAPTERS TILL LATEST

    async function scrape() {
        return new Promise(async (resolve, reject) => {
            try {
                $(".row-box .col-content .m-newest2 > .page").each(
                    (i, chapters) => {
                        $(chapters)
                            .find("a:last-child")
                            .each(async (_, x) => {
                                lastPage = parseInt(
                                    $(x).attr("href").split("/").length >= 3
                                        ? $(x)
                                              .attr("href")
                                              .split("/")[2]
                                              .split(".")[0]
                                        : 1
                                );
                                console.time("time taken");
                                for (let i = pageIndex; i <= pageIndex; i++) {
                                    const url = `https://freewebnovel.com/${novel_title}/${i}.html`;

                                    const inner$ = load(await getData(url));

                                    inner$(
                                        ".row-box .col-content .m-newest2 > .ul-list5 "
                                    ).each((i, chapters) => {
                                        let obj = {};
                                        inner$(chapters)
                                            .find("li a")
                                            .each((i, x) => {
                                                obj = {
                                                    chapter: inner$(x)
                                                        .text()
                                                        .split(/\:|-/)[0],
                                                    title: inner$(x)
                                                        .text()
                                                        .split(/\:|-/)[1],
                                                    url: inner$(x).attr("href"),
                                                };

                                                chaptersArray.push(obj);
                                            });
                                    });
                                }

                                resolve(chaptersArray);

                                console.timeEnd("time taken");
                            });
                    }
                );
            } catch (err) {
                reject(err);
            }
        });
    }

    const novelChapters = await scrape();

    // console.log("after push:", chaptersArray.length);
    console.log("pageIndex:", pageIndex);
    console.log("lastpage:", lastPage);
    if (pageIndex < parseInt(lastPage)) {
        results.next = { page: pageIndex + 1, limit: limit };
    }
    if (startPageIndex > 0) {
        if (!(pageIndex >= parseInt(lastPage))) {
            results.previous = { page: pageIndex - 1, limit: limit };
        } else
            results.previous = { page: parseInt(lastPage) - 1, limit: limit };
    }
    results.current_page = pageIndex;
    results.last_page = lastPage;
    results.title = title;
    results.url = `/${novel_title}.html`;
    results.url_parameter = `${novel_title}`;
    results.status = status;
    results.genre = genre;
    results.author = author;
    results.description = description;
    results.results = chaptersArray;

    return results;
};

export const getChapter = async (novel_title, ch_no) => {
    // novel_title = "emperors-domination";
    ch_no = parseInt(ch_no);
    const is_match = /^\d+$/.test(ch_no);
    const chapter_number = is_match && !isNaN(ch_no) ? ch_no : 1;

    const url = `https://freewebnovel.com/${novel_title}/chapter-${chapter_number}.html`;
    console.log("get_novel_chapter:", url);
    const res = await getData(url);
    const $ = load(res);

    const scrape_novel_title = $("#main1 > div > div > div.top .tit a").text();

    ///////////////////////////////////////////////////////////////////////
    /////* USING TWO CHAPTER_TITLE AS IN NEW UPLOADED NOVELS  *////////////
    /////* THE DIV ELEMENT POSITION CHANGED                   *////////////
    ///////////////////////////////////////////////////////////////////////
    const chapter_title1 = $(
        "#main1 > div > div > div.txt #article > h4"
    ).text();
    const chapter_title2 = $("#main1 > div > div > div.top .chapter").text();

    const chapter_title = chapter_title1
        ? chapter_title1
        : chapter_title2
        ? chapter_title2
        : "";

    let chapter = "";
    const prev_selector = $(
        "#main1 > div > div > div.top > .ul-list7 > li a"
    ).attr("href");
    const next_selector = $(
        "#main1 > div > div > div.top > ul > li:nth-child(4) > a"
    ).attr("href");

    const previous =
        prev_selector?.split("/").length >= 4
            ? Number(prev_selector.split("/")[3].split(".")[0].split("-")[1])
            : null;
    const next =
        next_selector?.split("/").length >= 4
            ? Number(next_selector.split("/")[3].split(".")[0].split("-")[1])
            : null;

    $(".m-read .wp .txt #article>p").each((i, x) => {
        chapter += $(x).text();
    });

    if (chapter.length <= 0) {
        return {
            success: false,
            next,
            previous,
            chapter:
                "Chapter content is missing or does not exist! Please try again later!",
        };
    }
    return {
        success: true,
        next,
        previous,
        chapter,
        chapter_title,
        novel_title: scrape_novel_title,
    };
};

//RECOMMENDATIONS
export const getKnnRecommendation = async (genre, novel_title = null) => {
    const novel = await sql.query(
        "select nt.id,nt.title, group_concat(gt.title  separator ',') as genre, nt.url_parameter,nt.chapters,nt.image_link,nt.link from novel_tbl nt left join genre_novel_tbl gnt on nt.id =gnt.novel_id left join genre_tbl gt on gt.id =gnt.genre_id group by nt.id,nt.title;"
    );
    const novels = novel[0];

    const dataset = {};
    const filterd = novels.map(
        (novel) =>
            (dataset[novel.url_parameter] = novel.genre
                .split(",")
                .map((x) => x.trim()))
    );
    function getSimilarNovelsByGenres(
        dataset,
        targetGenres,
        excludeNovel = null
    ) {
        const recommendedNovels = [];

        for (const novel in dataset) {
            if (novel !== excludeNovel) {
                const sharedGenres = dataset[novel].filter((genre) =>
                    targetGenres?.includes(genre)
                );
                if (sharedGenres.length > 0) {
                    const similarityRate =
                        sharedGenres.length / targetGenres.length;
                    recommendedNovels.push({
                        novel_title: novel,
                        similarityRate,
                    });
                }
            }
        }

        return recommendedNovels.sort(
            (a, b) => b.similarityRate - a.similarityRate
        );
    }

    const targetGenres = genre;
    const excludeNovel = novel_title;
    const similarNovels = getSimilarNovelsByGenres(
        dataset,
        targetGenres,
        excludeNovel
    );

    // Filter Dataset With Only Recommended Novels Remaining
    // Then Merge The Recommendednovels Array With Filtered Dataset
    const filteredDataset = novels.filter((obj) =>
        similarNovels?.some((item) => item.novel_title === obj.url_parameter)
    );
    const mergedArray = filteredDataset.map((obj) => ({
        ...obj,
        ...similarNovels.find((item) => item.novel_title === obj.url_parameter),
    }));
    mergedArray.sort((a, b) => b.similarityRate - a.similarityRate);

    return mergedArray;
};

export const getRatingRecommendation = async (userId) => {
    async function fetchAllNovels() {
        const query =
            "select nt.title,nt.chapters ,nt.image_link ,nt.url_parameter, group_concat(gt.title  separator ',') as genre from novel_tbl nt left join genre_novel_tbl gnt on nt.id =gnt.novel_id left join genre_tbl gt on gt.id =gnt.genre_id group by nt.id;";
        const get_all_novels = await sql.query(query).then((res) =>
            res[0].map((row) => ({
                novel_title: row.title,
                chapters: row.chapters,
                image_link: row.image_link,
                url_parameter: row.url_parameter,
                genre: row.genre.split(",").map((x) => x.trim()),
            }))
        );

        return get_all_novels;
    }
    const allNovels = await fetchAllNovels();

    async function fetchNovelRatings() {
        const query1 = "select * from user_tbl";
        const query2 = "select * from rating_tbl rt where  user_id =?";

        try {
            const [rows1] = await sql.execute(query1);
            const userAndRatings = {};
            for (const row of rows1) {
                const [rows2] = await sql.execute(query2, [row.id]);
                const obj = {};
                for (const row2 of rows2) {
                    obj[row2.novel_title] = row2.rating;
                }
                const uid = Number(row.id);
                userAndRatings[uid] = obj;
            }

            return userAndRatings;
        } catch (error) {
            console.error("Error:", error);
        }
        t;
    }

    const dataset = await fetchNovelRatings();

    function similarityDistance(preferences, person1, person2) {
        const similar = {};
        let sum = 0;

        for (const key in preferences[person1]) {
            if (preferences[person2].hasOwnProperty(key)) {
                similar[key] = 1;
            }
        }

        if (Object.keys(similar).length === 0) {
            return 0;
        }

        for (const key in preferences[person1]) {
            if (preferences[person2].hasOwnProperty(key)) {
                sum += Math.pow(
                    preferences[person1][key] - preferences[person2][key],
                    2
                );
            }
        }

        return 1 / (1 + Math.sqrt(sum));
    }

    function getRecommendations(preferences, person) {
        const total = {};
        const simSums = {};
        const ranks = {};
        let sim = 0;

        for (const otherPerson in preferences) {
            if (otherPerson !== person) {
                sim = similarityDistance(preferences, person, otherPerson);
            }

            if (sim > 0) {
                for (const key in preferences[otherPerson]) {
                    if (!preferences[person].hasOwnProperty(key)) {
                        if (!total.hasOwnProperty(key)) {
                            total[key] = 0;
                        }

                        total[key] += preferences[otherPerson][key] * sim;

                        if (!simSums.hasOwnProperty(key)) {
                            simSums[key] = 0;
                        }
                        simSums[key] += sim;
                    }
                }
            }
        }

        for (const key in total) {
            ranks[key] = total[key] / simSums[key];
        }
        const sortedRecommendArray = Object.entries(ranks).map(
            ([novel_title, similarity]) => ({
                novel_title,
                similarity,
            })
        );

        sortedRecommendArray.sort((a, b) => b.similarity - a.similarity);
        // console.log(sortedRecommendArray);
        // return sortedRecommendArray;

        const mergedNovels = sortedRecommendArray
            .map((recommendedNovel) => {
                const matchingNovel = allNovels.find(
                    (novel) =>
                        novel.url_parameter === recommendedNovel.novel_title
                );

                if (matchingNovel) {
                    return {
                        ...matchingNovel,
                        similarity: recommendedNovel.similarity,
                    };
                }

                return null;
            })
            .filter((novel) => novel !== null);

        return mergedNovels;
    }

    const user = String(userId);
    const recommendedItems = getRecommendations(dataset, user);
    return recommendedItems;
};
