import React, { useEffect, useState } from "react";
import "./quiz-info.css";

export const QuizInfo = ({ quizData }) => {
  const toDate = (val) => {
    if (!val) return null;
    if (val._seconds !== undefined) return new Date(val._seconds * 1000);
    if (typeof val === "number") return new Date(val);
    if (val instanceof Date) return val;
    try {
      return new Date(val);
    } catch {
      return null;
    }
  };

  // format countdown without seconds; returns e.g. "2d 3h 15m", "4h 05m", "12m", "<1 min", "Teraz"
  const formatCountdown = (target) => {
    if (!target) return "—";
    const ms = target.getTime() - Date.now();
    if (ms <= 0) return "Teraz";
    const totalMinutes = Math.floor(ms / 60000);
    if (totalMinutes < 1) return "<1 min";
    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${String(minutes).padStart(2, "0")}m`;
    return `${minutes}m`;
  };

  const [weddingCountdown, setWeddingCountdown] = useState(() => formatCountdown(toDate(quizData?.weddingTime)));

  useEffect(() => {
    const target = toDate(quizData?.weddingTime);
    if (!target) {
      setWeddingCountdown("—");
      return;
    }

    setWeddingCountdown(formatCountdown(target));

    // align updates to the start of each minute to avoid drifting
    const msToNextMinute = 60000 - (Date.now() % 60000);
    let minuteInterval = null;
    const timeoutId = setTimeout(() => {
      setWeddingCountdown(formatCountdown(target));
      minuteInterval = setInterval(() => {
        setWeddingCountdown(formatCountdown(target));
      }, 60000);
    }, msToNextMinute);

    return () => {
      clearTimeout(timeoutId);
      if (minuteInterval) clearInterval(minuteInterval);
    };
  }, [quizData?.weddingTime]);

  const formatTS = (val) => {
    if (!val) return "—";
    // Firestore timestamp shape
    if (val._seconds !== undefined) return new Date(val._seconds * 1000).toLocaleString();
    if (typeof val === "number") return new Date(val).toLocaleString();
    if (val instanceof Date) return val.toLocaleString();
    try {
      return String(val);
    } catch {
      return "—";
    }
  };

  return (
    <div className="lu-info-grid">
      <div className="lu-info">
        <div className="lu-info-label">Utworzenie</div>
        <div className="lu-info-value">{formatTS(quizData?.createdAt)}</div>
      </div>
      <div className="lu-info">
        <div className="lu-info-label">Otwarcie</div>
        <div className="lu-info-value">{formatTS(quizData?.startTime)}</div>
      </div>
      <div className="lu-info">
        <div className="lu-info-label">Zakończenie</div>
        <div className="lu-info-value">{formatTS(quizData?.endTime)}</div>
      </div>
      <div className="lu-info">
        <div className="lu-info-label">Ślub</div>
        <div className="lu-info-value">
          {formatTS(quizData?.weddingTime)}
          <div className="wedding-countdown">{weddingCountdown}</div>
        </div>
      </div>
      <p> Jako wlasciciel możesz wejść do quizu w kazdym momencie</p>
    </div>
  );
};
