import React from "react";
import Link from "next/link";

const DoneQuiz = ({ score, questions, handleSubmit }) => {
  const correctAnswers = Math.round((score / 100) * questions.length);
  const wrongAnswers = questions.length - correctAnswers;

  return (
    <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Quiz Finished!
        </h2>
        <div className="bg-gray-100 p-6 rounded-xl shadow-inner space-y-4">
          <p className="text-lg text-gray-700">
            Your score: <span className="font-semibold">{score}</span>%
          </p>
          <p className="text-lg text-gray-700">
            Total questions:{" "}
            <span className="font-semibold">{questions.length}</span>
          </p>
          <p className="text-lg text-gray-700">
            Correct answers:{" "}
            <span className="font-semibold">{correctAnswers}</span>
          </p>
          <p className="text-lg text-gray-700">
            Wrong answers: <span className="font-semibold">{wrongAnswers}</span>
          </p>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-teal-500 text-white py-3 px-6 rounded-lg hover:bg-teal-600 transition duration-200"
        >
          Submit Score
        </button>
        <Link
          href="/"
          className="mt-4 block w-full bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition duration-200 text-center"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default DoneQuiz;
