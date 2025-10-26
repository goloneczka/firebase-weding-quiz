import { getFunctions, httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./end-quiz.css";

const formatTS = (val) => {
  if (!val) return "—";
  // Firestore timestamp shape
  if (val._seconds !== undefined) return new Date(val._seconds * 1000).toLocaleString();
  if (typeof val === "number") return new Date(val).toLocaleString();
  if (val instanceof Date) return val.toLocaleString();
  try {
    return String(val);
  } catch {
    return "—";
  }
};

export const QuizEndView = () => {
  const { uuid } = useParams();

  const [quizData, setQuizData] = useState({});

  useEffect(() => {
    httpsCallable(
      getFunctions(),
      "getQuiz"
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

        <p className="quiz-ts">{formatTS(quizData?.createdAt)}</p>

        <div className="quiz-message">
          <h2 className="thanks">Dziękujemy za udział!</h2>
          <p className="thanks-details">
            Dziękujemy za rozwiązanie quizu weselnego — Twoje odpowiedzi zostały zapisane. Życzymy miłej zabawy, powodzenia w losowaniu nagród i
            wspaniałego świętowania!
          </p>
        </div>
      </div>

      <footer className="quiz-footer">
        <small>Weselny Quiz — przygotowany z miłością 💍</small>
      </footer>
    </div>
  );
};
