const express = require("express");
const router = express.Router();

const optionsController = require("../controllers/options_controller");

router.put("/:id/add_vote", optionsController.addVote);
router.delete("/:id/delete", optionsController.delete);

module.exports = router;
