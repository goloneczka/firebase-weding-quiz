import { getFunctions, httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { storageService } from "../../service/local-storage-service";

export const QuizContainer = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState({});
  const [userName, setUserName] = useState("");

  const handleStart = () => {
    const trimmed = userName.trim();
    if (!trimmed) {
      alert("Please enter your name to start the quiz");
      return;
    }

    storageService.setParticipant(trimmed);
    navigate(`/quiz/${uuid}/page/1`);
  };

  useEffect(() => {
    httpsCallable(
      getFunctions(),
      "getQuiz"
    )(uuid).then((restult) => {
      console.log(restult.data);
      setQuizData(restult.data);
    });
  }, []);

  return (
    <div>
      <p>QuizContainer</p>
      <p>{quizData.title || "hallo ?"}</p>
      <p>{quizData.createdAt?._seconds}</p>

      <div style={{ marginTop: 16 }}>
        <label htmlFor="participantName">Your name</label>
        <br />
        <input
          id="participantName"
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Imi(e/ona) gościa"
          style={{ padding: 8, width: "100%", maxWidth: 320, marginTop: 8 }}
        />
        <br />
        <button onClick={handleStart} disabled={!userName.trim()} style={{ marginTop: 12, padding: "10px 16px" }}>
          Start Quiz
        </button>
      </div>
    </div>
  );
};
