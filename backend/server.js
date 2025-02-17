const express = require("express");
const yaml = require("js-yaml");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

let config;

try {
    const fileContents = fs.readFileSync("./config.yml", "utf8");
    config = yaml.load(fileContents);
} catch (e) {
    console.error("Error loading config.yml:", e);
    process.exit(1);
}

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/files", require("./routes/fileRoutes"));

app.get("/config", (req, res) => {
    try {
        const fileContents = fs.readFileSync("config.yml", "utf8");
        const config = yaml.load(fileContents);
        res.json(config);
    } catch (error) {
        res.status(500).json({ error: "Failed to load config" });
    }
});


app.listen(config.server.port, () => console.log(`Server running at http://localhost:${config.server.port}`));