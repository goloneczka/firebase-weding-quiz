import { auth } from "../../../config/firebase-config";
import { signOut } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";
import storageService from "../../../service/local-storage-service";
import { QuizResultsView } from "./quiz-results";

export const AuthorizedUser = () => {
  const user = storageService.getAuthUser();

  const [quizData, setQuizData] = useState({});
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    httpsCallable(
      getFunctions(),
      "getQuizByOwner"
    )(user.mail).then((restult) => {
      setQuizData(restult.data.quiz);
      setAnswers(restult.data.answers);
    });
  }, []);

  async function logout() {
    await signOut(auth);
    storageService.clearUserAuth();
    window.location.reload();
  }

  return (
    <div>
      <p> user {user.mail} is authorized </p>
      <p>{quizData.title}</p>
      <span>
        <button> quiz </button>
        <button> wyniki </button>
      </span>
      <p>{quizData.createdAt?._seconds}</p>
      <QuizResultsView answers={answers} />

      <button onClick={logout}> logout </button>
    </div>
  );
};
