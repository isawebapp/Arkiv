const jwt = require("jsonwebtoken");
const yaml = require("js-yaml");
const fs = require("fs");

let config;
try {
    const fileContents = fs.readFileSync("./config.yml", "utf8");
    config = yaml.load(fileContents);
} catch (e) {
    console.error("Error loading config.yml:", e);
    process.exit(1);
}

exports.authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};
