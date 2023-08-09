import axios from "axios";
import { load } from "cheerio";
import { sqlConnection } from "../../database/connection.js";
import * as dotenv from "dotenv";
dotenv.config();
const DB_NAME = process.env.DB_NAME;

const sql = await sqlConnection(DB_NAME);

const novelHomepage = "https://freewebnovel.com/";
const mostPopularNovelsUrl = "https://freewebnovel.com/most-popular-novels/";
const genreTitleUrl = "https://freewebnovel.com/genres/Fantasy/";

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

const novelData = [];
export const mostPopularNovelsUrlData = getData(mostPopularNovelsUrl)
    .then((res) => {
        const $ = load(res);

        // FUNCTION TO FETCH EACH ROW OF NOVEL LIST
        $(".ul-list1.ul-list1-2.ss-custom>.li-row").each((i, novel) => {
            const name = $(novel).find(".tit a").text();
            const img_link = $(novel).find(".pic img").attr("src");
            const link = $(novel).find(".tit a").attr("href");
            const genre = [];
            // TO GET EACH NOVEL GENRE AS AN ARRAY
            $(novel)
                .find(".desc div:nth-child(2) .right a")
                .each((i, x) => {
                    genre[i] = $(x).text();
                });
            // TO GET TOTAL CHAPTER NUMBER OF A NOVEL
            const chapters = $(novel)
                .find(".desc div:nth-child(3) .right a .s1")
                .text()
                .split(" ")[0];

            const obj = { id: i, title: name, genre, chapters, img_link, link };

            novelData.push(obj);
        });

        return novelData;
    })
    .catch((err) => {
        throw err;
    });

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

    $(".row-box > .col-content").each((i, items) => {
        $(items)
            .find(".m-book1 > div")
            .each((i, x) => {
                //TO FETCH AUTHOR NAME:
                $(x)
                    .find(".m-imgtxt .txt div:nth-child(2) .right a")
                    .each((i, y) => (author[i] = $(y).text()));
                //TO FETCH GENRE LIST:
                $(x)
                    .find(".m-imgtxt .txt div:nth-child(3) .right a")
                    .each((i, z) => (genre[i] = $(z).text()));
                //TO FETCH NOVEL STATUS:
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
                            .each(async (i, x) => {
                                lastPage = parseInt(
                                    $(x)
                                        .attr("href")
                                        .split("/")[2]
                                        .split(".")[0]
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
    results.title = title;
    results.url = `/${novel_title}.html`;
    results.status = status;
    results.genre = genre;
    results.author = author;
    results.description = description;
    results.results = chaptersArray;

    return results;
};

const genres = [];
export const getAllGenres = getData(novelHomepage).then((res) => {
    const $ = load(res);

    $(".main .wp .m-newest .col-r> .ul-list3").each((i, genre) => {
        const titles = [];

        $(genre)
            .find("li .con")
            .each((i, x) => {
                const id = i;
                const title = $(x).text();
                const link = $(x).attr("href");
                const description = $(x).attr("title");
                const obj = { id, title, link, description };
                genres.push(obj);
            });
    });

    return genres;
});

export const getGenreTitles = async (genre_title, page_index) => {
    const isMatch = /^[A-Za-z0-9\-+_]+$/.test(genre_title);
    genre_title = isMatch ? genre_title : "Adventure";
    console.log(genre_title);

    page_index = parseInt(page_index);
    const isMatchNumber = /^\d+$/.test(page_index);
    const pageIndex = isMatchNumber || !isNaN(page_index) ? page_index : 1;

    const limit = 20;
    const startPageIndex = (pageIndex - 1) * limit;
    const endPageIndex = pageIndex * limit;
    const url = `https://freewebnovel.com/genres/${genre_title}/${pageIndex}.html`;
    console.log(url);

    const res = await getData(url);
    const $ = load(res);

    const genre = [];
    let latest_chapter_url = "";
    let title = "";
    let latest_chapter_number = "";
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
                            .find(".con .txt ")
                            .each((i, x) => {
                                //FETCH TITLE:
                                $(x)
                                    .find(".tit a")
                                    .map(
                                        (i, x) => (title = $(x).attr("title"))
                                    );

                                //TO FETCH GENRE LIST:
                                $(x)
                                    .find(".desc div:nth-child(2) .right a")
                                    .each((i, z) => {
                                        genre[i] = $(z).text();
                                    });
                                //TO FETCH NOVEL LASTEST CHAPTER URL:
                                $(x)
                                    .find(".desc div:nth-child(3) .right a")
                                    .map(
                                        (i, za) =>
                                            (latest_chapter_url =
                                                $(za).attr("href"))
                                    );

                                // TO FETCH LATEST NOVEL CHAPTER NUMBER:
                                $(x)
                                    .find(".right a span ")
                                    .each(
                                        (i, x) =>
                                            (latest_chapter_number =
                                                $(x).text())
                                    );

                                chaptersArray.push({
                                    title,
                                    genre,
                                    latest_chapter_url,
                                    latest_chapter_number,
                                });
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

    let chapter = "";

    $(".m-read .wp .txt #article>p").each((i, x) => {
        chapter += $(x).text();
    });

    return chapter;
};

//RECOMMENDATIONS
export const getKnnRecommendation = async (novel_id) => {
    try {
        // Sample dataset of novels and their associated genres (dummy data)
        const sample_dataset = [
            { novel_id: "Mystery Mansion", genres: ["Mystery", "Thriller"] },
        ];

        async function fetchAllNovels() {
            const query =
                "select nt.id as novel_id, group_concat(gnt.genre_id separator ',') as genre from novel_tbl nt left join genre_novel_tbl gnt on nt.id =gnt.novel_id group by nt.id,nt.title ;";
            const get_novel_with_matching_genre = await sql
                .query(query)
                .then((res) =>
                    res[0].map((row) => ({
                        novel_id: row.novel_id,
                        genre: row.genre.split(",").map((x) => Number(x)),
                    }))
                );

            return get_novel_with_matching_genre;
        }
        const dataset = await fetchAllNovels();
        async function fetch_novel_genre(novel_id) {
            const query = `select * from genre_novel_tbl where novel_id=${novel_id} order by genre_id`;
            const res = await sql.query(query);
            return res[0].map((row) => row.genre_id);
        }

        // Function to calculate Euclidean distance between two sets of genres
        function euclideanDistance(set1, set2) {
            //set 1 is dataset genre
            const allGenres = new Set([...set1, ...set2]);

            let sum = 0;
            for (const genre of allGenres) {
                const presence1 = set1.has(genre) ? 1 : 0;
                const presence2 = set2.has(genre) ? 1 : 0;
                sum += Math.pow(presence1 - presence2, 2);
            }

            return Math.sqrt(sum);
        }

        // k-Nearest Neighbors algorithm for genre-based recommendation using Euclidean distance
        function recommendNovelsByGenre(targetGenre, k, id) {
            // Calculate distances from targetGenre to all data points
            const distances = dataset
                .filter((x) => x.novel_id !== id)
                .map((data) => ({
                    novel_id: data.novel_id,
                    distance: euclideanDistance(
                        new Set(data.genre),
                        new Set(targetGenre)
                    ),
                }));

            // Sort distances in ascending order
            distances.sort((a, b) => a.distance - b.distance);

            // Select the first 'k' neighbors
            const nearestNeighbors = distances.slice(0, k);

            // Return recommended novels
            const recommendedNovels = nearestNeighbors.map(
                (neighbor) => neighbor.novel_id
            );

            return recommendedNovels;
        }

        // Example usage

        const main_novel_id = novel_id || 1;
        const providedGenre = await fetch_novel_genre(main_novel_id); // Provided genre for the novel
        const k = 10; // Number of neighbors to consider for recommendation

        const recommendedNovels = recommendNovelsByGenre(
            providedGenre,
            k,
            main_novel_id
        );

        // console.log(
        //     `Recommended Novels for id:${main_novel_id} = ${recommendedNovels}`
        // );
        return recommendedNovels;
    } catch (err) {
        throw err;
    }
};
