"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getScores } from "../../_actions/scoreAction";
import { BiStar } from "react-icons/bi";
import { FaMedal } from "react-icons/fa";

const Leaderboards = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await getScores();
        setLeaderboardData(response.scores);
      } catch (error) {
        console.error("Error fetching scores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
        Top Performers
      </h1>
      <div className="w-full max-w-4xl">
        <div className="bg-gray-100 shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-200 text-gray-900 text-lg font-medium grid grid-cols-4 gap-4 text-center">
            <span>Rank</span>
            <span>Nickname</span>
            <span>Score</span>
            <span>Mode</span>
          </div>
          <ul className="divide-y divide-gray-300 max-h-96 overflow-y-auto">
            {loading
              ? Array(10)
                  .fill()
                  .map((_, index) => (
                    <li
                      key={index}
                      className="px-6 py-4 grid grid-cols-4 gap-4 items-center text-center bg-white"
                    >
                      <div className="flex justify-center items-center space-x-2">
                        <Skeleton width={30} height={30} />
                        <Skeleton width={20} />
                      </div>
                      <Skeleton width={100} />
                      <Skeleton width={60} />
                      <Skeleton width={60} />
                    </li>
                  ))
              : leaderboardData.slice(0, 10).map((item, index) => (
                  <li
                    key={index}
                    className={`px-6 py-4 grid grid-cols-4 gap-4 items-center text-center ${
                      index === 0
                        ? "bg-yellow-100 font-bold text-xl"
                        : index === 1
                        ? "bg-gray-100 font-semibold"
                        : index === 2
                        ? "bg-gray-200"
                        : "bg-white"
                    }`}
                  >
                    <div className="flex justify-center items-center space-x-2">
                      {index < 3 && (
                        <FaMedal
                          className={`${
                            index === 0
                              ? "text-yellow-500"
                              : index === 1
                              ? "text-gray-500"
                              : "text-orange-500"
                          }`}
                        />
                      )}
                      <span className="text-lg">{index + 1}</span>
                    </div>
                    <div className="text-lg">{item.nickname}</div>
                    <div className="text-lg text-gray-700">{item.score}</div>
                    <div className="text-lg flex justify-center items-center">
                      {item.difficulty === "easy" ? (
                        <span className="text-green-500 flex items-center">
                          <BiStar className="mr-1" />
                          Easy
                        </span>
                      ) : item.difficulty === "hard" ? (
                        <span className="text-red-500 flex items-center">
                          <BiStar className="mr-1" />
                          Hard
                        </span>
                      ) : (
                        <span className="text-gray-500">Unknown</span>
                      )}
                    </div>
                  </li>
                ))}
          </ul>
        </div>
      </div>
      <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-4xl justify-center">
        <Link
          href="/"
          className="w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 flex justify-center"
        >
          Go Back
        </Link>
        <Link
          href="/start-quiz"
          className="w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 flex justify-center"
        >
          Take a Quiz
        </Link>
      </div>
    </div>
  );
};

export default Leaderboards;
