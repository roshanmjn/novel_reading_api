"use strict";
const englishAfinnVoca = require("afinn-165");
const englishAfinnFinancialMarketNewsVoca =
    require("afinn-165-financialmarketnews").afinnFinancialMarketNews;
const englishSenticonVoca = require("./English/senticon_en.json");
const englishPatternVoca = require("./English/pattern-sentiment-en.json");
const englishNegations = require("./English/negations_en.json").words;
const languageFiles = {
    afinn: {
        English: [englishAfinnVoca, englishNegations],
    },
    afinnFinancialMarketNews: {
        English: [englishAfinnFinancialMarketNewsVoca, englishNegations],
    },
    senticon: {
        English: [englishSenticonVoca, englishNegations],
    },
    pattern: {
        English: [englishPatternVoca, englishNegations],
    },
};

class SentimentAnalyzer {
    constructor(language, stemmer, type) {
        this.language = language;
        this.stemmer = stemmer;

        this.vocabulary = Object.assign({}, languageFiles[type][language][0]);
        Object.setPrototypeOf(this.vocabulary, null);
        if (type === "senticon") {
            Object.keys(this.vocabulary).forEach((word) => {
                this.vocabulary[word] = this.vocabulary[word].pol;
            });
        } else {
            if (type === "pattern") {
                Object.keys(this.vocabulary).forEach((word) => {
                    this.vocabulary[word] = this.vocabulary[word].polarity;
                });
            }
        }
        this.negations = [];
        if (languageFiles[type][language][1] != null) {
            this.negations = languageFiles[type][language][1];
        }
        if (stemmer) {
            const vocaStemmed = Object.create(null);
            for (const token in this.vocabulary) {
                vocaStemmed[stemmer.stem(token)] = this.vocabulary[token];
            }
            this.vocabulary = vocaStemmed;
        }
    }

    // words is an array of words (strings)
    getSentiment(words) {
        let score = 0;
        let negator = 1;
        // let nrHits = 0

        words.forEach((token) => {
            const lowerCased = token.toLowerCase();
            if (this.negations.indexOf(lowerCased) > -1) {
                negator = -1;
                // nrHits++
            } else {
                // First try without stemming
                if (this.vocabulary[lowerCased] !== undefined) {
                    score += negator * this.vocabulary[lowerCased];
                } else {
                    if (this.stemmer) {
                        const stemmedWord = this.stemmer.stem(lowerCased);
                        if (this.vocabulary[stemmedWord] !== undefined) {
                            score += negator * this.vocabulary[stemmedWord];
                        }
                    }
                }
            }
        });

        score = score / words.length;

        return score;
    }
}

module.exports = SentimentAnalyzer;
