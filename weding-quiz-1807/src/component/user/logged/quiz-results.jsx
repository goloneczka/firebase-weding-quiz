import { useEffect, useState } from "react";
import "./quiz-results.css";

export const QuizResultsView = ({ answers }) => {
  const [quizResults, setQuizResults] = useState([]);

  useEffect(() => {
    const answersToShow = answers
      .map((a) => {
        const date = a.createdAt?._seconds ? new Date(a.createdAt._seconds * 1000) : "";
        return { points: a.points, time: a.totalTime, createdAt: date, user: a.participant };
      })
      .sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        return a.time - b.time;
      });
    setQuizResults(answersToShow);
  }, [answers]);

  const initials = (name = "") =>
    name
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const fmtTime = (seconds) => `${Number(seconds).toFixed(2)}s`;

  const relative = (ts) => {
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 10) return "just now";
    if (diff < 60) return `${diff}s`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    return `${Math.floor(diff / 86400)}d`;
  };

  return (
    <div className="qr-root">
      <header className="qr-header">
        <h1>Weding Quiz — Results</h1>
        <p className="qr-sub">Thank you for playing — leaderboard (mobile friendly)</p>
      </header>

      <ul className="qr-list" role="list">
        {quizResults.map((r, i) => (
          <li key={i} className="qr-item">
            <div className="qr-rank">{i + 1}</div>

            <div className="qr-avatar" aria-hidden>
              {initials(r.user)}
            </div>

            <div className="qr-body">
              <div className="qr-user">{r.user}</div>
              <div className="qr-meta">
                <span className="qr-time">{fmtTime(r.time)}</span>
                <span className="qr-created"> · {relative(r.createdAt)}</span>
              </div>
            </div>

            <div className="qr-score">
              <div className="qr-points">{r.points}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
