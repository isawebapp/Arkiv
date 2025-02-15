const express = require("express");
const { getFiles, getFileContent, searchFiles } = require("../controllers/fileController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getFiles);

router.get("/view", getFileContent);

router.get("/search", searchFiles);

module.exports = router;
