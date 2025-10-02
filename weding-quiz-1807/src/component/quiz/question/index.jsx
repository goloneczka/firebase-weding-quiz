import { getFunctions, httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./question.css";

export const QuizQuestionContainer = () => {
  const { uuid, page } = useParams();

  const [questionData, setQuestionData] = useState({});
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    httpsCallable(
      getFunctions(),
      "getQuizQuestion"
    )({ quizId: uuid, questionNumber: page }).then((restult) => {
      setQuestionData(restult.data);
    });
  }, [uuid, page]);

  const handleSelect = (idx) => setSelected(idx);

  return (
    <div className="wedding-quiz-container">
      <div className="wedding-quiz-card">
        <div className="wedding-quiz-header">
          <span className="wedding-ring">💍</span>
          <h2>Quiz Question {questionData.no}</h2>
        </div>
        <div className="wedding-quiz-question">{questionData.text}</div>
        <div className="wedding-quiz-answers">
          {(questionData.answers || []).map((ans, idx) => (
            <button key={idx} className={`wedding-quiz-answer${selected === idx ? " selected" : ""}`} onClick={() => handleSelect(idx)}>
              {ans}
            </button>
          ))}
        </div>
        <button className="wedding-quiz-next-btn" disabled={selected === null}>
          Next Question
        </button>
      </div>
    </div>
  );
};
