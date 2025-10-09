import { auth } from "../../config/firebase-config";
import { signOut } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";
import storageService from "../../service/local-storage-service";

export const AuthorizedUser = () => {
  const user = storageService.getAuthUser();

  const [quizData, setQuizData] = useState({});

  useEffect(() => {
    httpsCallable(
      getFunctions(),
      "getQuizByOwner"
    )(user.mail).then((restult) => {
      setQuizData(restult.data);
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

      <button onClick={logout}> logout </button>
    </div>
  );
};
