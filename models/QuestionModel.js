import { Schema, models, model } from "mongoose";

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  choices: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const QuestionModel = models.question || model("question", questionSchema);

export default QuestionModel;
