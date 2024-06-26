"use server";

import ScoreModel from "../models/ScoreModel";
import connectDB from "../config/database";

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

export async function submitScore({ nickname, score }) {
  try {
    await connectDB(); // Connect to MongoDB
    const newScore = new ScoreModel({
      nickname,
      score: Number(score), // Ensure score is converted to number
    });
    await newScore.save(); // Save the new score
    return { message: "Score submitted successfully" };
  } catch (error) {
    return { errMsg: error.message };
  }
}
