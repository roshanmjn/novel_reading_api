"use strict";

function buildExportMap(modules) {
    const result = {};
    modules.forEach((module) => {
        Object.keys(module).forEach((key) => {
            result[key] = module[key];
        });
    });
    return result;
}

module.exports = buildExportMap([
    require("./brill_pos_tagger"),
    require("./classifiers"),
    require("./distance"),
    require("./inflectors"),
    require("./ngrams"),
    require("./normalizers"),
    require("./phonetics"),
    require("./analyzers"),
    require("./sentiment"),
    require("./spellcheck"),
    require("./stemmers"),
    require("./tfidf"),
    require("./tokenizers"),
    require("./transliterators"),
    require("./trie"),
    require("./util"),
    require("./wordnet"),
]);
