import { getFunctions, httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { storageService } from "../../../service/local-storage-service";
import { QuizStartForm } from "../shared/quiz-start";

export const QuizStartLogged = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState({});
  const [userName, setUserName] = useState("");

  useEffect(() => {
    httpsCallable(
      getFunctions(),
      "getQuizByOwner"
    )(storageService.getAuthUser().mail).then((restult) => {
      setQuizData(restult.data.quiz);
    });
    setUserName(storageService.getAuthUser().mail);
  }, []);

  const handleStart = () => {
    const trimmed = userName.trim();
    if (!trimmed) {
      alert("Please enter your name to start the quiz");
      return;
    }

    storageService.clearQuiz();
    storageService.setParticipant(trimmed);
    navigate(`/quiz/${uuid}/page/1`);
  };

  return <QuizStartForm quizData={quizData} userName={userName} onUserNameChange={setUserName} onStart={handleStart} />;
};
