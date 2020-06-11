const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "babam_db"
});

module.exports = pool;