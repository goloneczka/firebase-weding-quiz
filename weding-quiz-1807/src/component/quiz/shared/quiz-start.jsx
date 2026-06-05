import { formatTS } from "../../../service/firebase-service";
import "./quiz-start.css";

export const QuizStartForm = ({ quizData, userName, onUserNameChange, onStart }) => {
  return (
    <div className="quiz-start-root">
      <div className="quiz-card">
        <div className="quiz-header">
          <span className="emoji">💛</span>
          <h1 className="quiz-title">{quizData?.title || "Quiz weselny"}</h1>
        </div>

        <p className="quiz-ts">{formatTS(quizData?.weddingTime)}</p>

        <div className="quiz-message">
          <h2 className="welcome">Dołącz do zabawy !</h2>
          <p className="invite">
            Zapraszamy do rozwiązania quizu weselnego o parze młodej. Wyniki zostaną ogłoszone po oczepinach, dla zwycięzcy przewidziana jest nagroda.
            Całość zajmie tylko kilka minut.
          </p>

          <label htmlFor="participantName" className="label">
            Twoje/Wasze imiona
          </label>
          <input
            id="participantName"
            className="input"
            type="text"
            value={userName}
            onChange={(e) => onUserNameChange(e.target.value)}
            placeholder="Imię gościa"
            inputMode="text"
            autoComplete="name"
          />

          <button className="start-btn" onClick={onStart} disabled={!userName?.trim()}>
            Rozpocznij quiz
          </button>

          <p className="thanks-note">Dziękujemy, że bierzesz udział — Twoja obecność wiele znaczy. Powodzenia i miłej zabawy!</p>
        </div>
      </div>

      <footer className="quiz-footer">
        <small>Weselny Quiz — przygotowany z miłością 💍</small>
      </footer>
    </div>
  );
};
