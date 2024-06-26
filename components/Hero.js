import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="min-h-screen bg-blue-200 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          Welcome to the Quiz App!
        </h1>
        <p className="mt-3 text-lg text-gray-500 sm:mt-5 sm:text-xl md:mt-5 md:text-2xl">
          Test your knowledge with our quiz. Are you ready?
        </p>
        <div className="mt-5 sm:mt-8 sm:flex justify-center space-y-3 sm:space-y-0 sm:space-x-3">
          <Link
            href="/start-quiz"
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
          >
            Start Quiz
          </Link>
          <Link
            href="/leaderboard"
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
          >
            Leaderboards
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
