import { getFunctions, httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div>
      <p>QuizContainer</p>
      <p>{quizData.title || "hallo ?"}</p>
      <p>{quizData.createdAt?._seconds}</p>
      <p>dziękujemy za udział w quizie !</p>
    </div>
  );
};
