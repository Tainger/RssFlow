const express = require('express');
const logger = require('./utils/logger');

logger.info('🍻 RSSHub start! Cheers!');
process.env.REDIS_PORT_6379_TCP_ADDR = 'localhost'
process.env.REDIS_PORT_6379_TCP_PORT = 6379


process.env.BINANCE_KEY = 'cbMLYGU9ceTHeIDrk1VBid5JxzFfvCTKqZl4pD0QWHB8OwGkxNGLITlk01rJn0lz'
process.env.BINANCE_SECRET = '6if5jGnq6DxHEHseLj0yUB2tLuozLrsUNwCHIPI4zE2mSCuKxIsmvfElMWJKCEA2'

const app = express();
app.engine('art', require('express-art-template'));

app.all('*', require('./routes/all'));

// // bilibili
// app.get('/bilibili/user/video/:uid', require('./routes/bilibili/video'));
// app.get('/bilibili/user/fav/:uid', require('./routes/bilibili/fav'));
// app.get('/bilibili/user/coin/:uid', require('./routes/bilibili/coin'));
// app.get('/bilibili/user/dynamic/:uid', require('./routes/bilibili/dynamic'));
// app.get('/bilibili/partion/:tid', require('./routes/bilibili/partion'));
app.get('/bilibili/bangumi/:seasonid', require('./routes/bilibili/bangumi'));


app.get('/binance/coin/:symbol/:interval', require('./routes/binance/coin-pirce'));
app.get('/product/hunter/:today', require('./routes/producthunt/today'));


app.listen(1200);