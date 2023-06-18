const art = require('art-template');
const path = require('path');
const base = require('../base');
const mix = require('../../utils/mix');
const got = require('../../utils/got');
const cheerio = require("cheerio");
const moment = require("moment");


module.exports = (req, res) => {

    const uid = req.params.uid;
    base({
        req: req,
        res: res,
        getHTML: async (callback) => {

            const response = await got.get('https://www.producthunt.com/')
            const data = JSON.parse(cheerio.load(response.data)('#__NEXT_DATA__').html());
            console.log(data)
            const list = Object.values(data.props.apolloState)
                .filter((o) => o.__typename === 'Post')
                // only includes new post, not product
                .filter((o) => o.hasOwnProperty('redirectToProduct') && o.redirectToProduct === null);

            const items = await Promise.all(
                    list.map(async (item) => {
                        const detailresponse = await got(`https://www.producthunt.com/posts/${item.slug}`);

                        const data = JSON.parse(cheerio.load(detailresponse.data)('#__NEXT_DATA__').html());
                        const descData = data.props.apolloState[`Post${item.id}`];

                        return {
                            title: `${item.slug} - ${item.tagline}`,
                            description: descData.description,
                            link: `https://www.producthunt.com/posts/${item.slug}`,
                            pubDate: descData.createdAt,
                        };
                    })
                )
            ;
            const html = art(path.resolve(__dirname, '../../views/rss.art'), {
                title: `productRss`,
                lastBuildDate: new Date().toUTCString(),
                item: items.map((item) => ({
                    title: item.title,
                    description: item.description,
                    pubDate: item.pubDate,
                    link: item.link
                })),
            });
            callback(html)
        }
    })
}