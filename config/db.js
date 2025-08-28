const { Pool } = require("pg");
const config = require("config");

const pool = new Pool({
  database: config.get("db.name"),
  user: config.get("db.username"),
  password: config.get("db.password"),
  port: config.get("db.port"),
  host: config.get("db.host"),
});

module.exports = pool;
