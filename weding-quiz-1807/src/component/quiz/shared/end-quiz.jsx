import { getFunctions, httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./end-quiz.css";
import { formatTS } from "../../../service/firebase-service";

export const QuizEndView = () => {
  const { uuid } = useParams();

  const [quizData, setQuizData] = useState({});

  useEffect(() => {
    httpsCallable(
      getFunctions(),
      "getQuiz",
    )(uuid).then((restult) => {
      setQuizData(restult.data);
    });
  }, []);

  return (
    <div className="quiz-end-root">
      <div className="quiz-card">
        <div className="quiz-header">
          <span className="emoji">💛</span>
          <h1 className="quiz-title">{quizData.title || "Quiz weselny"}</h1>
        </div>

        <p className="quiz-ts">{formatTS(quizData?.weddingTime)}</p>

        <div className="quiz-message">
          <h2 className="thanks">Dziękujemy za udział !</h2>
          <p className="thanks-details">
            Dziękujemy za rozwiązanie quizu weselnego — Twoje odpowiedzi zostały zapisane. Życzymy dalszej miłej zabawy.
          </p>
        </div>
      </div>

      <footer className="quiz-footer">
        <small>Weselny Quiz — przygotowany z miłością 💍</small>
      </footer>
    </div>
  );
};
