const express = require("express");
const { getFiles, getFileContent } = require("../controllers/fileController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getFiles);

router.get("/view", getFileContent);

module.exports = router;
