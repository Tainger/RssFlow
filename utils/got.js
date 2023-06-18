const got = require('got');
const {HttpsProxyAgent} = require("https-proxy-agent");

//二次重试走代理proxy
const agent = new HttpsProxyAgent("http://127.0.0.1:7890");

const custom = got.extend({
    agent: {
        https: agent,
        http: agent,
    },
    retry: 3,
    hooks: {
        beforeRetry: [
            (options, err, count) => {
                console.log(`Request ${options.url} fail, retry attempt #${count}: ${err}`);
            },
        ],
        afterResponse: [
            (response) => {
                try {
                    response.data = JSON.parse(response.body);
                } catch (e) {
                    response.data = response.body;
                }
                response.status = response.statusCode;
                return response;
            },
        ],
        init: [
            (options) => {
                // compatible with axios api
                if (options && options.data) {
                    options.body = options.body || options.data;
                }
            },
        ],
    },
    headers: {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
    },
    timeout: 4000,
});


module.exports = custom;