const {getIp, ua} = require('../../utils/mix')

request = {
    headers: {
        'x-forwarded-for': '192.168.0.1',
    },
    connection: {
        remoteAddress: '192.168.0.2',
        socket: {
            remoteAddress: '192.168.0.3',
        },
    },
}

const ip = getIp(request)

console.log(ip)
console.log(ua)