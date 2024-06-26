"use client";

import { useState, useEffect } from "react";
import { FaCheck, FaTimes, FaRedo, FaArrowRight } from "react-icons/fa";

const HardQuiz = ({ questions, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [wrongAnswer, setWrongAnswer] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCorrectAnswer(null);
    setWrongAnswer(null);
  }, [currentQuestionIndex]);

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
  };

  const handleCheckAnswer = () => {
    const isCorrect = selectedAnswer === currentQuestion.answer;
    setShowExplanation(true);
    setCorrectAnswer(currentQuestion.answer);
    setWrongAnswer(isCorrect ? null : selectedAnswer);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    const score = calculateScore();
    onFinish(score);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCorrectAnswer(null);
    setWrongAnswer(null);
  };

  const calculateScore = () => {
    return questions.reduce((acc, question, index) => {
      if (selectedAnswer === question.answer) {
        return acc + 1;
      }
      return acc;
    }, 0);
  };

  return (
    <div className="relative max-w-4xl w-full bg-white rounded-lg shadow-md p-6 sm:py-8 sm:px-12 space-y-6 overflow-y-auto max-h-[calc(100vh-2rem)]">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold text-gray-800">
          Question {currentQuestionIndex + 1}/{questions.length}
        </div>
      </div>
      <div className="text-gray-900 text-xl font-medium mb-4">
        {currentQuestion.question}
      </div>
      <div className="space-y-2 mb-4">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === correctAnswer && showExplanation;
          const isWrong =
            option === selectedAnswer &&
            selectedAnswer !== correctAnswer &&
            showExplanation;

          return (
            <button
              key={index}
              onClick={() => handleAnswerClick(option)}
              className={`block w-full p-3 text-left rounded-md border transition duration-200 ${
                isSelected
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              } ${
                isCorrect
                  ? "bg-green-500 text-white"
                  : isWrong
                  ? "bg-red-500 text-white"
                  : ""
              }`}
              disabled={showExplanation}
            >
              {option}
            </button>
          );
        })}
      </div>
      {showExplanation && (
        <div className="bg-gray-100 p-4 rounded-md text-gray-900">
          <p className="mb-2">
            {selectedAnswer === currentQuestion.answer ? (
              <span className="text-green-500 flex items-center">
                <FaCheck className="mr-2" />
                Correct! Well done.
              </span>
            ) : (
              <span className="text-red-500 flex items-center">
                <FaTimes className="mr-2" />
                Wrong.
              </span>
            )}
            {selectedAnswer !== currentQuestion.answer && (
              <span className="text-gray-900 ml-2">
                The correct answer is: {currentQuestion.answer}
              </span>
            )}
          </p>
          <p className="text-gray-700 font-medium">Explanation:</p>
          <p className="text-gray-700">{currentQuestion.rationale}</p>
        </div>
      )}
      <div className="flex justify-end mt-4 space-x-4 items-center">
        {showExplanation && selectedAnswer !== currentQuestion.answer ? (
          <button
            onClick={handleRestart}
            className="flex items-center bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
          >
            Try Again <FaRedo className="ml-2" />
          </button>
        ) : showExplanation && selectedAnswer === currentQuestion.answer ? (
          <button
            onClick={handleNextQuestion}
            className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            {currentQuestionIndex < questions.length - 1 ? (
              <>
                Next <FaArrowRight className="ml-2" />
              </>
            ) : (
              "Finish"
            )}
          </button>
        ) : (
          <button
            onClick={handleCheckAnswer}
            className="flex items-center bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
            disabled={selectedAnswer === null}
          >
            Check Answer <FaCheck className="ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

export default HardQuiz;
