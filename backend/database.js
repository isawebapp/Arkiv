const sqlite3 = require("better-sqlite3");
const path = require("path");

const db = new sqlite3(path.join(__dirname, "database.sqlite"));

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );
`);

module.exports = db;
