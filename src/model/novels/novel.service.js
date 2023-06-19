import axios from "axios";
import { load } from "cheerio";

const novelHomepage = "https://freewebnovel.com/";
const mostPopularNovelsUrl = "https://freewebnovel.com/most-popular-novels/";

async function getData(url) {
    const { data: html } = await axios.get(url);
    return html;
}

const novelData = [];
export const mostPopularNovelsUrlData = getData(mostPopularNovelsUrl).then(
    (res) => {
        const $ = load(res);
        // FUNCTION TO FETCH EACH ROW OF NOVEL LIST
        $(".ul-list1.ul-list1-2.ss-custom>.li-row").each((i, novel) => {
            const name = $(novel).find(".tit a").text();
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

            const obj = { id: i, title: name, genre, chapters };

            novelData.push(obj);
        });

        return novelData;
    }
);
