const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: {
      //question statement
      type: String,
      required: true,
    },
    options: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Option",
      },
    ],
  },
  {
    timestamps: true, //for getting the created at, updated at fields
  }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
