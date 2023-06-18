const cheerio = require('cheerio');

const $ = cheerio.load('<ul id="fruits">...</ul>');

console.log($.html())