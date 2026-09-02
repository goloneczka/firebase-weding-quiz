import { getFunctions, httpsCallable } from "firebase/functions";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { storageService } from "../../../service/local-storage-service";
import { QuizQuestionShared } from "../shared/quiz-question";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../config/firebase-config";
import { Spinner } from "../../spiner/spinner";

import { hexToRgb } from "../../../service/firebase-service";

export const QuizQuestionNotLogged = () => {
  const { uuid, page } = useParams();
  const navigate = useNavigate();
  const startTimeRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [questionData, setQuestionData] = useState({});
  const [selected, setSelected] = useState(null);

  const [bgPhotoUrl, setBgPhotoUrl] = useState(null);

  const setImageState = (bgUrl) => {
    const img = new Image();
    img.src = bgUrl;
    img.onload = () => {
      setBgPhotoUrl(bgUrl);
      setIsLoading(false);
    };
  };

  const fetchCustomImage = (imageOrBucketPath) => {
    if (imageOrBucketPath.endsWith("/")) {
      const basePath = import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL;
      const bgUrl = `${basePath}/image/${imageOrBucketPath}default.png`;
      setImageState(bgUrl);
      return;
    }
    const imageRef = ref(storage, imageOrBucketPath);
    getDownloadURL(imageRef)
      .then((bgUrl) => {
        setImageState(bgUrl);
      })
      .catch((_) => {
        const basePath = import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL;
        const bgUrl = `${basePath}/image/${imageOrBucketPath}default.png`;
        setImageState(bgUrl);
      });
  };

  useEffect(() => {
    const intPage = parseInt(page, 10);
    if (!storageService.validateCurrentQuestion(intPage)) {
      storageService.clearQuiz();
      navigate(`/quiz/${uuid}`);
      return;
    }

    const prevAnswers = storageService.getQuizAnswersOrEmpty();
    if (prevAnswers[intPage]) {
      setSelected(prevAnswers[intPage].answer);
    } else {
      setSelected(null);
    }

    setIsLoading(true);
    loadThemeColorsIfNeeded();

    httpsCallable(
      getFunctions(),
      "getQuizQuestion",
    )({ quizId: uuid, questionNumber: page }).then((restult) => {
      setQuestionData(restult.data);
      startTimeRef.current = Date.now();
      fetchCustomImage(restult.data.imageOrBucketPath);
    });
  }, [uuid, page]);

  const loadThemeColorsIfNeeded = () => {
    if (!document.documentElement.style.getPropertyValue("--quiz-primary")) {
      const quizColors = storageService.getQuizColors();

      if (quizColors.p && quizColors.s) {
        const root = document.documentElement;
        root.style.setProperty("--quiz-primary", quizColors.p);
        root.style.setProperty("--quiz-primary-rgb", hexToRgb(quizColors.p));
        root.style.setProperty("--quiz-secondary", quizColors.s);
        root.style.setProperty("--quiz-secondary-rgb", hexToRgb(quizColors.s));
      }
    }
  };

  const handleSelect = (idx) => setSelected(idx);

  const handleNextQuestion = () => {
    const timePassed = (Date.now() - startTimeRef.current) / 1000; // seconds

    const prevAnswers = storageService.getQuizAnswersOrEmpty();
    prevAnswers[page] = { answer: selected, t: timePassed };
    storageService.setQuizAnswers(prevAnswers);
    const user = storageService.getParticipant();

    if (questionData.isLast) {
      setIsLoading(true);
      return httpsCallable(
        getFunctions(),
        "submitQuiz",
      )({ quizId: uuid, answers: prevAnswers, user }).finally(() => {
        setIsLoading(false);
        navigate(`/quiz/${uuid}/end`);
        storageService.clearQuiz();
        return;
      });
    }
    const nextPage = parseInt(page, 10) + 1;
    navigate(`/quiz/${uuid}/page/${nextPage}`);
  };

  return (
    <div>
      {isLoading ? (
        <Spinner size="medium" />
      ) : (
        <QuizQuestionShared
          questionData={questionData}
          selected={selected}
          handleSelect={handleSelect}
          handleNextQuestion={handleNextQuestion}
          bgPhotoUrl={bgPhotoUrl}
        />
      )}
    </div>
  );
};
