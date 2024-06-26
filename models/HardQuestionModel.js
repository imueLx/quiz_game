import { Schema, models, model } from "mongoose";

const hardQuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  rationale: {
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

const HardQuestionModel =
  models.hardquestion || model("hardquestion", hardQuestionSchema);

export default HardQuestionModel;
