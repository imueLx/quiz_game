"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getQuestions, getHardQuestions } from "../../_actions/questionAction";
import { submitScore } from "../../_actions/scoreAction";
import Quiz from "../../components/Quiz";
import HardQuiz from "../../components/HardQuiz";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const StartQuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [nickname, setNickname] = useState("");
  const [level, setLevel] = useState("1");
  const [difficulty, setDifficulty] = useState("easy");
  const [isNicknameEntered, setIsNicknameEntered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false); // New state to track quiz start
  const router = useRouter();
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        let response;
        if (difficulty === "hard") {
          response = await getHardQuestions();
        } else {
          response = await getQuestions(level, difficulty);
        }
        setQuestions(response.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    if (isNicknameEntered) {
      fetchQuestions();
    }
  }, [isNicknameEntered, level, difficulty]);

  useEffect(() => {
    if (isQuizStarted) {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  }, [isQuizStarted]);

  const handleFinish = (finalScore) => {
    const scorePercentage = Math.round((finalScore / questions.length) * 100);
    setScore(scorePercentage);
    setIsQuizFinished(true);
    toast.success("Congratulations! You've finished the quiz!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await submitScore({ nickname, score });
      if (response.errMsg) {
        throw new Error(response.errMsg);
      }
      toast.success("Score submitted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error("Error submitting score:", error);
      toast.error("Error submitting score. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleNicknameSubmit = () => {
    if (nickname.trim()) {
      setIsNicknameEntered(true);
      setIsQuizStarted(true); // Start the quiz
    } else {
      toast.error("Please enter a nickname", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-teal-400 to-blue-400 p-6">
      <ToastContainer />
      <audio ref={audioRef} src="/background-music-quiz.mp3" loop />
      {isQuizStarted && (
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 text-white text-2xl"
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      )}
      {isNicknameEntered ? (
        questions.length > 0 ? (
          isQuizFinished ? (
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
                    <span className="font-semibold">
                      {Math.round((score / 100) * questions.length)}
                    </span>
                  </p>
                  <p className="text-lg text-gray-700">
                    Wrong answers:{" "}
                    <span className="font-semibold">
                      {questions.length -
                        Math.round((score / 100) * questions.length)}
                    </span>
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
          ) : difficulty === "easy" ? (
            <Quiz questions={questions} onFinish={handleFinish} />
          ) : (
            <HardQuiz questions={questions} onFinish={handleFinish} />
          )
        ) : (
          <div className="text-center text-white text-xl">Loading...</div>
        )
      ) : (
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Enter Your Nickname
            </h2>
            <p className="text-gray-600 mt-2">
              Please provide a nickname to start the quiz.
            </p>
          </div>
          <label className="block">
            <span className="text-gray-700">Nickname</span>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            />
          </label>
          <label className="block mt-4">
            <span className="text-gray-700">Difficulty</span>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            >
              <option value="easy">Easy Mode</option>
              <option value="hard">Hard Mode</option>
            </select>
          </label>
          {difficulty !== "hard" && (
            <label className="block mt-4">
              <span className="text-gray-700">Choose Set of Questions</span>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              >
                <option value="1">Set One</option>
                <option value="2">Set Two</option>
                <option value="3">Set Three</option>
              </select>
            </label>
          )}
          <button
            onClick={handleNicknameSubmit}
            className="mt-6 w-full bg-teal-500 text-white py-3 px-6 rounded-lg hover:bg-teal-600 transition duration-200"
          >
            Start Quiz
          </button>
          <Link
            href="/"
            className="mt-1 block w-full bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition duration-200 text-center"
          >
            Go Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default StartQuizPage;
