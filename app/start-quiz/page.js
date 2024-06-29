"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { getQuestions, getHardQuestions } from "../../_actions/questionAction";
import { submitScore } from "../../_actions/scoreAction";
import Quiz from "../../components/Quiz";
import HardQuiz from "../../components/HardQuiz";
import EnterNickname from "../../components/EnterNickname";
import DoneQuiz from "../../components/DoneQuiz";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const StartQuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [nickname, setNickname] = useState("");
  const [level, setLevel] = useState("1");
  const [difficulty, setDifficulty] = useState("easy");
  const [isNicknameEntered, setIsNicknameEntered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        let response;
        if (difficulty === "hard") {
          response = await getHardQuestions(level);
        } else {
          response = await getQuestions(level);
        }
        setQuestions(response.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false); // Set loading to false when fetching ends
      }
    };

    if (isNicknameEntered) {
      fetchQuestions();
    }
  }, [isNicknameEntered, level, difficulty]);

  useEffect(() => {
    if (isQuizStarted) {
      const timer = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
        }
      }, 1500);
      return () => clearTimeout(timer); // Clean up the timeout if the component unmounts or dependencies change
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
      const response = await submitScore({ nickname, score, difficulty });
      if (response.errMsg) {
        throw new Error(response.errMsg);
      }
      console.log("Score submitted successfully:", response.message);
      toast.success("Score submitted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
      setIsQuizStarted(true);
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
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-16 px-4 sm:px-6 lg:px-8">
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
        loading ? (
          <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <p className="text-xl font-semibold text-gray-800">
                {level === "99"
                  ? "Loading Special Set Questions..."
                  : `Loading Set ${level} Questions...`}
              </p>

              <div className="mt-4 animate-spin text-4xl text-gray-900">
                <AiOutlineLoading3Quarters />
              </div>
            </div>
          </div>
        ) : questions.length > 0 ? (
          isQuizFinished ? (
            <DoneQuiz
              score={score}
              questions={questions}
              handleSubmit={handleSubmit}
            />
          ) : (
            <Suspense fallback={<div>Loading Set {level} Questions...</div>}>
              {difficulty === "easy" ? (
                <Quiz
                  questions={questions}
                  setNumber={level}
                  mode={difficulty}
                  onFinish={handleFinish}
                />
              ) : (
                <HardQuiz
                  questions={questions}
                  setNumber={level}
                  mode={difficulty}
                  onFinish={handleFinish}
                />
              )}
            </Suspense>
          )
        ) : (
          <div>No questions available.</div>
        )
      ) : (
        <EnterNickname
          nickname={nickname}
          setNickname={setNickname}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          level={level}
          setLevel={setLevel}
          handleNicknameSubmit={handleNicknameSubmit}
        />
      )}
    </div>
  );
};

export default StartQuizPage;
