const moment = require('moment')

const formattedDate = moment(1686639600000).format('YYYY-MM-DD HH:mm:ss');
console.log(formattedDate);


const date = new Date(1686639600000)
var s = date.toUTCString();
console.log(s)