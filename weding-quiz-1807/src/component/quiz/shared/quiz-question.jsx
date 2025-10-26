import React, { useEffect, useState } from "react";
import "./quiz-question.css";

export const QuizQuestionShared = ({ questionData, selected, handleSelect, handleNextQuestion, bgPhotoUrl, progress = 0 }) => {
  const answers = questionData.answers || [];

  return (
    <div className="qq-bg" style={{ backgroundImage: `url(${bgPhotoUrl})` }}>
      <div className="qq-overlay">
        <div className="qq-card" role="group" aria-labelledby="qq-title">
          <header className="qq-header" id="qq-title">
            <div className="qq-title-left">
              <span className="qq-ring" aria-hidden="true">
                💍
              </span>
              <div className="qq-title-text">
                <h2>
                  Pytanie <span className="qq-no">{questionData.no}</span>
                </h2>
                <div className="qq-progress" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                  <div className="qq-progress-bar" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
          </header>

          <main className="qq-body">
            <div className="qq-question">{questionData.text}</div>

            <div className="qq-answers" role="list">
              {answers.map((ans, idx) => (
                <button
                  key={idx}
                  className={`qq-answer ${selected === idx ? "selected" : ""}`}
                  onClick={() => handleSelect(idx)}
                  aria-pressed={selected === idx}
                  role="listitem"
                >
                  <span className="qq-answer-index">{String.fromCharCode(65 + idx)}</span>
                  <span className="qq-answer-text">{ans}</span>
                </button>
              ))}
            </div>
          </main>

          <footer className="qq-footer">
            <button className="qq-next" disabled={selected === null} onClick={handleNextQuestion}>
              Kolejne
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};
