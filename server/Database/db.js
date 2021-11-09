const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "emanuel",
    host: "localhost",
    port: 5432,
    database: "mtblog"
});

module.exports = pool;