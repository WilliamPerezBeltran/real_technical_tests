async function getArticleTitles(author) {
    let titles = [];
    let page = 1;
    let totalPages = 1;

    while (page <= totalPages) {
        const url = `https://jsonmock.hackerrank.com/api/articles?author=${author}&page=${page}`;
        const response = await fetch(url);
        const data = await response.json();
        totalPages = data.total_pages;

        for (const article of data.data) {
            if (article.title) {
                titles.push(article.title);
            } else if (article.story_title) {
                titles.push(article.story_title);
            }
        }
        page++;
    }

    return titles;
}
'use strict';

const fs = require('fs');
const axios = require('axios');
const fetch = require('node-fetch');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}



/*
 * Complete the 'getArticleTitles' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts STRING author as parameter.
 * 
 * URL for cut and paste: 
 * https://jsonmock.hackerrank.com/api/articles?author=<authorName>&page=<num>
 *
 */

async function getArticleTitles(author) {
    let titles = [];
    let page = 1;
    let totalPages = 1;

    while (page <= totalPages) {
        const url = `https://jsonmock.hackerrank.com/api/articles?author=${author}&page=${page}`;
        const response = await fetch(url);
        const data = await response.json();
        totalPages = data.total_pages;

        for (const article of data.data) {
            if (article.title) {
                titles.push(article.title);
            } else if (article.story_title) {
                titles.push(article.story_title);
            }
        }
        page++;
    }

    return titles;
}

async function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const author = readLine();

    const result = await getArticleTitles(author);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
