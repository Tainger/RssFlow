const request = require('request');
const art = require('art-template');
const path = require('path');
const base = require('../base');
const mix = require('../../utils/mix');
const got = require('../../utils/got');
const moment = require("moment");


module.exports = (req, res) => {
    const symbol = req.params.symbol;
    const interval = req.params.interval;
    const limit = req.params.limit || 500;

    base({
        req: req,
        res: res,
        getHTML: async (callback) => {
            const {body} = await got.get(`https://api3.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);
            const data = JSON.parse(body);
            const html = art(path.resolve(__dirname, '../../views/rss.art'), {
                title: `${symbol}的${interval}级别的数据`,
                lastBuildDate: new Date().toUTCString(),
                item: data.map((item) => ({
                    title: `${moment(item[0]).format('YYYY-MM-DD HH:mm:ss')}`,
                    description: `收盘价 ${item[4]}`,
                    pubDate: `${moment(item[0]).format('YYYY-MM-DD HH:mm:ss')}`,
                    link: ''
                })),
            });
            callback(html)
        }
    });
};