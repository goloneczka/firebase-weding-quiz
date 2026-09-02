import { getFunctions, httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { storageService } from "../../../service/local-storage-service";
import { QuizStartForm } from "../shared/quiz-start";
import { QuizStartLoader } from "../shared/quiz-start-loader";

import { hexToRgb } from "../../../service/firebase-service";

export const QuizStartNotLogged = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [quizData, setQuizData] = useState({});
  const [userName, setUserName] = useState("");

  useEffect(() => {
    httpsCallable(
      getFunctions(),
      "getQuiz",
    )(uuid).then((restult) => {
      loadThemeColors(restult.data);
      setQuizData(restult.data);
    });
  }, [uuid]);

  const loadThemeColors = (quizData) => {
    const root = document.documentElement;

    root.style.setProperty("--quiz-primary", quizData.primaryColor);
    root.style.setProperty("--quiz-primary-rgb", hexToRgb(quizData.primaryColor));

    root.style.setProperty("--quiz-secondary", quizData.secondaryColor);
    root.style.setProperty("--quiz-secondary-rgb", hexToRgb(quizData.secondaryColor));
  };

  const handleStart = () => {
    const trimmed = userName.trim();
    if (!trimmed) {
      alert("Please enter your name to start the quiz");
      return;
    }

    storageService.clearQuiz();
    storageService.setParticipant(trimmed);
    storageService.setQuizColors({ p: quizData.primaryColor, s: quizData.secondaryColor });

    setIsQuizStarted(true);
  };

  const handleLoaderFinish = () => {
    navigate(`/quiz/${uuid}/page/1`);
  };

  return (
    <>
      {isQuizStarted ? (
        <QuizStartLoader onFinishLoad={handleLoaderFinish} />
      ) : (
        <QuizStartForm quizData={quizData} userName={userName} onUserNameChange={setUserName} onStart={handleStart} />
      )}
    </>
  );
};
