const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const yaml = require("js-yaml");
const fs = require("fs");
const db = require("../database");

const router = express.Router();

let config;
try {
    const fileContents = fs.readFileSync("./config.yml", "utf8");
    config = yaml.load(fileContents);
} catch (e) {
    console.error("Error loading config.yml:", e);
    process.exit(1);
}

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        stmt.run(username, hashedPassword);

        res.json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Username already exists" });
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const stmt = db.prepare("SELECT * FROM users WHERE username = ?");
    const user = stmt.get(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, config.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
});

router.get("/me", (req, res) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        res.json(decoded);
    } catch (error) {
        res.status(400).json({ error: "Invalid or expired token" });
    }
});

module.exports = router;