"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getScores } from "../../_actions/scoreAction";

const Leaderboards = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await getScores();
        setLeaderboardData(response.scores);
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
        Top Performers
      </h1>
      <div className="w-full max-w-4xl">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex justify-between">
            <span className="text-lg font-medium text-gray-900">Nickname</span>
            <span className="text-lg font-medium text-gray-900">Score</span>
          </div>
          <ul className="divide-y divide-gray-200 overflow-y-auto max-h-96 lg:max-h-[32rem]">
            {leaderboardData.slice(0, 10).map((item, index) => (
              <li
                key={index}
                className={`px-6 py-4 flex justify-between items-center ${
                  index === 0
                    ? "bg-blue-100 font-extrabold text-2xl"
                    : index === 1
                    ? "bg-gray-200 font-bold"
                    : index === 2
                    ? "bg-gray-300"
                    : "bg-white"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`text-lg ${index === 0 ? "text-blue-900" : ""}`}
                  >
                    {index + 1}
                  </div>
                  <div className="text-lg">{item.nickname}</div>
                </div>
                <div className="text-lg text-gray-500">{item.score}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8 flex space-x-4">
        <Link
          href="/"
          className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Go Back
        </Link>
        <Link
          href="/start-quiz"
          className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Take a Quiz
        </Link>
      </div>
    </div>
  );
};

export default Leaderboards;
