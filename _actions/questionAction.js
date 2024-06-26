"use server";

import QuestionModel from "../models/QuestionModel";
import connectDB from "../config/database";

export async function getQuestions(level) {
  try {
    await connectDB();
    const questions = await QuestionModel.find({ level: level }).lean(); // Use lean() to get plain JavaScript objects

    const limitedQuestions = questions.sort(() => 0.5 - Math.random());
    const plainQuestions = limitedQuestions.map((q) => ({
      ...q,
      _id: q._id.toString(),
    }));

    return { questions: plainQuestions };
  } catch (error) {
    return { errMsg: error.message };
  }
}
