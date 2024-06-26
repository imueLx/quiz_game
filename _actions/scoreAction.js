"use server";

import ScoreModel from "../models/ScoreModel";
import connectDB from "../config/database";
import { cp } from "fs";

export async function getScores() {
  try {
    await connectDB();
    const scores = await ScoreModel.find().sort({ score: -1 }).lean(); // Fetch and sort scores
    const plainScores = scores.map((score) => ({
      ...score,
      _id: score._id.toString(), // Convert _id to string
    }));
    return { scores: plainScores }; // Return the plain scores
  } catch (error) {
    return { errMsg: error.message };
  }
}

export async function submitScore({ nickname, score, difficulty }) {
  try {
    await connectDB();
    const newScore = new ScoreModel({
      nickname,
      score: Number(score), // Ensure score is converted to number
      difficulty,
    });
    await newScore.save(); // Save the new score
    return { message: "Score submitted successfully" };
  } catch (error) {
    return { errMsg: error.message };
  }
}
