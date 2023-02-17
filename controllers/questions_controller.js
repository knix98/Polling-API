const Question = require("../models/question");
const Option = require("../models/option");

// to send a list of all the questions
module.exports.questions = async function (req, res) {
  try {
    // getting all questions in chronological order(most old question first)
    let allQuestions = await Question.find({}).sort("createdAt");

    // creating the list of question to be sent, with the link to the question added
    let newQuestions = allQuestions.map((question) => {
      let ques = question._doc;
      return {
        id: ques._id,
        title: ques.title,
        link_to_question: `http://localhost:8000/questions/${ques._id}`,
      };
    });

    return res.status(200).json({
      success: true,
      message: "List of questions",
      questions: newQuestions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// to create a new question
module.exports.create = async function (req, res) {
  try {
    // if title string is empty
    if (!req.body.title || req.body.title == "") {
      return res.status(400).json({
        success: false,
        message: "Cannot create question with no title",
      });
    }

    //create question in the questions collection
    let question = await Question.create({
      title: req.body.title,
    });

    return res.status(200).json({
      success: true,
      message: "Question created successfully",
      question: {
        id: question._id,
        title: question.title,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// to find and send a requested question
module.exports.find = async function (req, res) {
  try {
    // finding the question
    let question = await Question.findById(req.params.id);

    // if question not found
    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question not found",
      });
    }

    // populating the options field of the question(only text and votes fields of options)
    question = await question.populate("options", "text votes");

    // adding the "link_to_vote" field inside each option
    let newOptions = question.options.map((option) => {
      let opt = option._doc;
      return {
        ...opt,
        link_to_vote: `http://localhost:8000/options/${opt._id}/add_vote`,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Here is your question",
      question: {
        id: question._id,
        title: question.title,
        options: newOptions,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// to delete any question along with it's options
module.exports.delete = async function (req, res) {
  try {
    //finding the question to delete
    let question = await Question.findById(req.params.id);

    // if question not found
    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Bad Request",
      });
    }

    //first deleting the associated options from the Option schema
    await Option.deleteMany({ question: question._id });

    //now deleting the question
    question.remove();

    return res.status(200).json({
      success: true,
      message: "Question removed",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
