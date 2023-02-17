const Question = require("../models/question");
const Option = require("../models/option");

// to create a new option in a question
module.exports.create = async function (req, res) {
  try {
    // if option text string is empty
    if (!req.body.text || req.body.text == "") {
      return res.status(400).json({
        success: false,
        message: "Cannot create option with no text",
      });
    }

    // finding the question on which option needs to be created
    let question = await Question.findById(req.params.id);

    // if question not found
    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question not found",
      });
    }

    //create option in the options collection
    let option = await Option.create({
      text: req.body.text,
      question: question._id,
      votes: 0,
    });

    //adding the option to the specific question
    question.options.push(option._id);
    question.save();

    return res.status(200).json({
      success: true,
      message: "Option created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// to add vote to an option of any question
module.exports.addVote = async function (req, res) {
  try {
    //first find the option from the Option collection
    let option = await Option.findById(req.params.id);

    // if option not found
    if (!option) {
      return res.status(400).json({
        success: false,
        message: "Bad Request",
      });
    }

    // increment the votes of the option
    option.votes += 1;
    option.save();

    return res.status(200).json({
      success: true,
      message: "Vote added successfully",
      data: {
        option: {
          text: option.text,
          votes: option.votes,
        },
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.delete = async function (req, res) {
  try {
    //finding the option to delete
    let option = await Option.findById(req.params.id);

    // if option not found
    if (!option) {
      return res.status(400).json({
        success: false,
        message: "Bad Request",
      });
    }

    //finding the parent question of the option
    let question = await Question.findById(option.question);

    // first remove option from options array of the specific question
    question.options.pull(option._id);
    question.save();

    //now destroy the option
    option.remove();

    return res.status(200).json({
      success: true,
      message: "Option removed",
      data: {
        updated_question: `http://localhost:8000/questions/${question._id}`,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
