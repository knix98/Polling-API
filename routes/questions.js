const express = require("express");
const router = express.Router();

const questionsController = require("../controllers/questions_controller");
const optionsController = require("../controllers/options_controller");

router.get("/all_questions", questionsController.questions);
router.post("/create", questionsController.create);
router.post("/:id/options/create", optionsController.create);
router.get("/:id", questionsController.find);
router.delete("/:id/delete", questionsController.delete);

module.exports = router;
