"use client";

// components/Quiz.js
import { useState, useEffect } from "react";
import { questions } from "../data/questions";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill("")
  );
  const [timeLeft, setTimeLeft] = useState(90); // 90 seconds for the whole quiz
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setShowScore(true);
    }
  }, [timeLeft]);

  const handleAnswerOptionClick = () => {
    if (
      selectedOptions[currentQuestion] === questions[currentQuestion].answer
    ) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleOptionChange = (option) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestion] = option;
    setSelectedOptions(newSelectedOptions);
  };

  const handleTryAgain = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
    setSelectedOptions(Array(questions.length).fill(""));
    setTimeLeft(90);
    setLevel(1);
  };

  const handleQuestionSelect = (index) => {
    setCurrentQuestion(index);
  };

  const handleNextLevel = () => {
    setLevel(level + 1);
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
    setSelectedOptions(Array(questions.length).fill(""));
    setTimeLeft(90);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-4">
      <div className="flex justify-between w-full max-w-xl mb-5">
        <div className="text-xl font-semibold text-gray-700">
          Level: {level}
        </div>
        <div className="text-xl font-semibold text-gray-700">
          Time Left: {timeLeft} seconds
        </div>
      </div>
      <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md">
        {showScore ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600">
              You scored {score} out of {questions.length}
            </h2>
            {score === questions.length ? (
              <button
                onClick={handleNextLevel}
                className="mt-4 w-full px-4 py-2 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600"
              >
                Proceed to Next Level
              </button>
            ) : (
              <button
                onClick={handleTryAgain}
                className="mt-4 w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Try Again
              </button>
            )}
          </div>
        ) : (
          <div>
            <div className="mb-4 text-xl font-semibold text-gray-700">
              Question {currentQuestion + 1}/{questions.length}
            </div>
            <div className="mb-4 text-xl font-semibold text-gray-700">
              {questions[currentQuestion].question}
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
              {questions[currentQuestion].options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg shadow-sm cursor-pointer hover:bg-blue-100"
                >
                  <input
                    type="radio"
                    name="option"
                    value={option}
                    checked={selectedOptions[currentQuestion] === option}
                    onChange={(e) => handleOptionChange(e.target.value)}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                className="w-full px-4 py-2 font-semibold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
                disabled={currentQuestion === 0}
              >
                Back
              </button>
              <button
                onClick={handleAnswerOptionClick}
                className="w-full px-4 py-2 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600"
                disabled={!selectedOptions[currentQuestion]}
              >
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex mt-4 space-x-2 overflow-auto">
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => handleQuestionSelect(index)}
            className={`px-2 py-1 font-semibold rounded-lg ${
              currentQuestion === index
                ? "bg-purple-500 text-white"
                : "bg-white text-purple-500 border border-purple-500"
            } hover:bg-purple-600 hover:text-white`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
