const express = require("express");
const yaml = require("js-yaml");
const fs = require("fs");
const cors = require("cors");

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

const PORT = config.port;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
