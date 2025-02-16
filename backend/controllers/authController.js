const db = require("../database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const yaml = require("js-yaml");
const fs = require("fs");

// Load config.yml
let config;
try {
    const fileContents = fs.readFileSync("./config.yml", "utf8");
    config = yaml.load(fileContents);
} catch (e) {
    console.error("Error loading config.yml:", e);
    process.exit(1);
}

exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        stmt.run(username, hashedPassword);

        res.json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Username already exists" });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const stmt = db.prepare("SELECT * FROM users WHERE username = ?");
    const user = stmt.get(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, config.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
};
