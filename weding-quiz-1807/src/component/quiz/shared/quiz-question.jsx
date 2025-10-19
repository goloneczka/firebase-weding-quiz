import React, { useEffect, useState } from "react";
import "./question.css";

export const QuizQuestionShared = ({ questionData, selected, handleSelect, handleNextQuestion }) => {
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
        <button className="wedding-quiz-next-btn" disabled={selected === null} onClick={handleNextQuestion}>
          Next Question
        </button>
      </div>
    </div>
  );
};
