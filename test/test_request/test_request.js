var http = require("http");
var https = require("https");
var {HttpsProxyAgent} = require("https-proxy-agent");
var request = require("request");
var got = require("got");
const axios = require("axios");
const Url = require("url");

var agent = new HttpsProxyAgent("http://127.0.0.1:7890");

function run_get(url) {
    const clientRequest = /^https/.test(url) ? https : http;
    clientRequest.get(
        {
            ...Url.parse(url),
            agent,
        },
        (res) => {
            var data = "";
            res.on("data", (chunk) => (data += chunk));
            res.on("end", () => {
                console.log(data);
            });
        }
    );
}

function run_request(url) {
    request(
        {
            url,
            proxy: "http://127.0.0.1:7890",
        },
        function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                console.log(body);
            }
        }
    );
}

async function run_got(url) {
    const res = await got(url, {
        agent: {
            https: agent,
            http: agent,
        },
    });
    console.log(res.body);
}

async function run_axios(url) {
    const res = await axios(url, {
        httpsAgent: agent,
        httpAgent: agent,
    });
    console.log(res.data);
}

run_got('https://api3.binance.com/api/v3/klines?symbol=BTCUSDT&interval=15m')