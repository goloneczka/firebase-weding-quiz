import { auth } from "../../../config/firebase-config";
import { signOut } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";
import storageService from "../../../service/local-storage-service";
import { QuizResultsView } from "./quiz-results";
import "./loged-user.css";
import { QuizInfo } from "./quiz-info";

export const AuthorizedUser = () => {
  const user = storageService.getAuthUser();

  const [quizData, setQuizData] = useState({});
  const [answers, setAnswers] = useState([]);
  const [activeTab, setActiveTab] = useState("quiz");

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
    <div className="lu-root">
      <div className="lu-topbar">
        <div className="lu-user">
          <div className="lu-avatar" aria-hidden>
            {String(user?.mail || "G")
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <div className="lu-user-meta">
            <div className="lu-user-mail">{user?.mail || "Unknown"}</div>
            <div className="lu-user-sub">Quiz owner</div>
          </div>
        </div>
        <button className="lu-logout" onClick={logout}>
          Logout
        </button>
      </div>

      <header className="lu-header">
        <h1 className="lu-title">{quizData?.title || "Untitled Quiz"}</h1>

        <div className="lu-actions">
          <button className={`lu-btn ${activeTab === "quiz" ? "lu-btn-primary" : ""}`} onClick={() => setActiveTab("quiz")}>
            Quiz
          </button>
          <button className={`lu-btn ${activeTab === "results" ? "lu-btn-primary" : ""}`} onClick={() => setActiveTab("results")}>
            Wyniki
          </button>
        </div>
      </header>

      <main className="lu-content">
        <section className="lu-card">
          {activeTab === "quiz" && <QuizInfo quizData={quizData} />}
          {activeTab === "results" && <QuizResultsView answers={answers} />}
        </section>
      </main>
    </div>
  );
};
