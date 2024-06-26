"use client";

import { useState, useEffect } from "react";

const Quiz = ({ questions, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timer, setTimer] = useState(30); // 30 seconds for each question

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    if (timer === 0) {
      handleNextQuestion();
    }

    return () => clearInterval(countdown);
  }, [timer]);

  const handleNextQuestion = () => {
    setTimer(30);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTimer(30);
    }
  };

  const handleAnswerClick = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: option,
    });
  };

  const handleFinish = () => {
    const score = calculateScore();
    onFinish(score);
  };

  const calculateScore = () => {
    return questions.reduce((acc, question, index) => {
      if (selectedAnswers[index] === question.answer) {
        return acc + 1;
      }
      return acc;
    }, 0);
  };

  return (
    <div className="relative max-w-4xl w-full bg-white rounded-lg shadow-md p-6 sm:py-8 sm:px-12 space-y-4 overflow-y-auto max-h-[calc(100vh-2rem)]">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold text-gray-800">
          Question {currentQuestionIndex + 1}/{questions.length}
        </div>
        <div className="text-lg font-semibold text-gray-800">
          Time left: {timer}s
        </div>
      </div>
      <div className="text-gray-900 text-xl font-medium mb-4">
        {currentQuestion.question}
      </div>
      <div className="space-y-2 mb-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(option)}
            className={`block w-full p-3 text-left rounded-md border transition duration-200 ${
              selectedAnswers[currentQuestionIndex] === option
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousQuestion}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
          disabled={currentQuestionIndex === 0}
        >
          Back
        </button>
        {currentQuestionIndex < questions.length - 1 ? (
          <button
            onClick={handleNextQuestion}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleFinish}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
