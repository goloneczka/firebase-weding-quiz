import { getFunctions, httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../config/firebase-config";

import "./quiz-start-loader.css";
import { Spinner } from "../../spiner/spinner";

export const QuizStartLoader = ({ onFinishLoad }) => {
  const { uuid } = useParams();
  const [preloadedUrls, setPreloadedUrls] = useState([]);
  const [displayedCount, setDisplayedCount] = useState(0);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const greetings = [
    "Dziękujemy, że z nami jesteś!",
    "Thank you for being with us!",
    "Merci d'être avec nous!",
    "Gracias por estar con nosotros!",
    "Danke, dass du bei uns bist!",
  ];

  useEffect(() => {
    if (!uuid) return;

    httpsCallable(
      getFunctions(),
      "getQuizImageNames",
    )(uuid)
      .then(async (result) => {
        const imageNames = Array.isArray(result.data) ? result.data : [];
        const urls = await Promise.all(imageNames.map(preloadImage));
        setPreloadedUrls(urls.filter(Boolean));
      })
      .catch((error) => {
        console.error("Error loading quiz images:", error);
        onFinishLoad();
      });
  }, [uuid]);

  useEffect(() => {
    if (preloadedUrls?.length === 0) return;

    const interval = setInterval(() => {
      setDisplayedCount((prev) => {
        const next = prev + 1;
        return next > preloadedUrls.length ? preloadedUrls.length : next;
      });
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [preloadedUrls]);

  useEffect(() => {
    if (preloadedUrls?.length === 0 || displayedCount < preloadedUrls.length) return;
    onFinishLoad();
  }, [displayedCount, preloadedUrls, onFinishLoad]);

  useEffect(() => {
    const greetingTimer = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 2000);

    return () => clearInterval(greetingTimer);
  }, [greetings.length]);

  const preloadImage = async (path) => {
    try {
      const url = await getDownloadURL(ref(storage, path));
      await new Promise((resolve) => {
        const img = new Image();
        img.onload = img.onerror = () => resolve(url);
        img.src = url;
      });
      return url;
    } catch (error) {
      console.warn("Failed to preload image:", path, error);
      return null;
    }
  };

  return (
    <div className="quiz-start-root">
      <div className="quiz-card">
        <p className="greeting-text" key={greetingIndex}>
          {greetings[greetingIndex]}
        </p>
        <Spinner size="medium" />

        <div style={{ opacity: 0 }}>
          {preloadedUrls.slice(0, displayedCount).map((url) => (
            <div className="qq-bg" style={{ backgroundImage: `url(${url})` }} />
          ))}
        </div>

        <p className="thanks-note">Ładujemy piksele ...</p>
      </div>
    </div>
  );
};
