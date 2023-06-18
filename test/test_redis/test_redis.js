const redis = require('redis');

const client = redis.createClient({
    host: 'localhost',
    port: 6379
});

client.on('error', err => console.log('Redis Client Error', err));

client.set('key', 'value2', (error, reply) => {
    if (error) {
        console.error('Redis SET Error', error);
    } else {
        console.log('Redis SET Reply', reply);

        client.get('key', (error, value) => {
            if (error) {
                console.error('Redis GET Error', error);
            } else {
                console.log('Redis GET Value', value);
            }

            client.quit(); // 断开与Redis的连接
        });
    }
});