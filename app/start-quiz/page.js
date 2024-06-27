"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getQuestions, getHardQuestions } from "../../_actions/questionAction";
import { submitScore } from "../../_actions/scoreAction";
import Quiz from "../../components/Quiz";
import HardQuiz from "../../components/HardQuiz";
import EnterNickname from "../../components/EnterNickname";
import DoneQuiz from "../../components/DoneQuiz";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const router = useRouter();
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchQuestions = async () => {
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
            <DoneQuiz
              score={score}
              questions={questions}
              handleSubmit={handleSubmit}
            />
          ) : (
            <Suspense
              fallback={<div>Loading Set {questions} Questions...</div>}
            >
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
        ) : null
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
