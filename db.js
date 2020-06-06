const mysql = require('mysql');

const connect = () => {
    const pool = mysql.createPool({
        host:'mypanel.sytes.net',
        user: 'donkey',
        password: 'olddonkeygarage',
        port: 3306,
        database: 'olddonkeygarage'
    });
    global.db = pool;
};


module.exports = {
    connect: connect
}