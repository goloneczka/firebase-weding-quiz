import { getFunctions, httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { storageService } from "../../../service/local-storage-service";
import { QuizStartForm } from "../shared/quiz-start";

export const QuizStartNotLogged = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState({});
  const [userName, setUserName] = useState("");

  useEffect(() => {
    httpsCallable(
      getFunctions(),
      "getQuiz"
    )(uuid).then((restult) => {
      setQuizData(restult.data);
    });
  }, [uuid]);

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
