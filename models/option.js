const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  text: {
    //content of option
    type: String,
    required: true,
  },
  question: {
    // this option belongs to which question
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Question",
  },
  votes: {
    type: Number,
  },
});

const Option = mongoose.model("Option", optionSchema);

module.exports = Option;
