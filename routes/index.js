//this will use the same instance of express created during the main server index.js file
const express = require("express");

const router = express.Router();

router.use("/questions", require("./questions"));
router.use("/options", require("./options"));

module.exports = router;
