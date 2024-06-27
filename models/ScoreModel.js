import { Schema, models, model } from "mongoose";

const scoreSchema = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
});

const ScoreModel = models.score || model("score", scoreSchema);

export default ScoreModel;
