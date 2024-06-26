"use server";

import QuestionModel from "../models/QuestionModel";
import HardQuestionModel from "../models/HardQuestionModel";
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

export async function getHardQuestions(level) {
  try {
    await connectDB();
    let questions;

    if (level === "1") {
      // Fetch questions without a level
      questions = await HardQuestionModel.find({
        $or: [{ level: { $exists: false } }, { level: null }],
      }).lean();
    } else if (level === "2") {
      // Fetch questions with level 1 as an integer or a string
      questions = await HardQuestionModel.find({
        $or: [{ level: 1 }, { level: "1" }],
      }).lean();
    } else if (level === "3") {
      // Fetch questions with level 2 as a string
      questions = await HardQuestionModel.find({ level: "2" }).lean();
    } else {
      throw new Error("Invalid level specified");
    }

    // Shuffle questions array
    const shuffledQuestions = questions.sort(() => 0.5 - Math.random());

    // Limit to 15 questions
    const limitedQuestions = shuffledQuestions.slice(0, 15);

    // Convert _id to string
    const plainQuestions = limitedQuestions.map((q) => ({
      ...q,
      _id: q._id.toString(),
    }));

    return { questions: plainQuestions };
  } catch (error) {
    return { errMsg: error.message };
  }
}
