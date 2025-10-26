import { getFunctions, httpsCallable } from "firebase/functions";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { storageService } from "../../../service/local-storage-service";
import { QuizQuestionShared } from "../shared/quiz-question";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../config/firebase-config";

export const QuizQuestionNotLogged = () => {
  const { uuid, page } = useParams();
  const navigate = useNavigate();
  const startTimeRef = useRef(null);

  const [questionData, setQuestionData] = useState({});
  const [selected, setSelected] = useState(null);

  const [bgPhotoUrl, setBgPhotoUrl] = useState("");

  const fetchCustomImage = (imageOrBucketPath) => {
    if (imageOrBucketPath.endsWith("/")) {
      const basePath = import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL;
      const bgUrl = `${basePath}/image/${imageOrBucketPath}default.png`;
      setBgPhotoUrl(bgUrl);
      return;
    }
    const imageRef = ref(storage, imageOrBucketPath);
    getDownloadURL(imageRef).then((url) => {
      setBgPhotoUrl(url);
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

    httpsCallable(
      getFunctions(),
      "getQuizQuestion"
    )({ quizId: uuid, questionNumber: page }).then((restult) => {
      setQuestionData(restult.data);
      startTimeRef.current = Date.now();
      fetchCustomImage(restult.data.imageOrBucketPath);
    });
  }, [uuid, page]);

  const handleSelect = (idx) => setSelected(idx);

  const handleNextQuestion = () => {
    const timePassed = (Date.now() - startTimeRef.current) / 1000; // seconds

    const prevAnswers = storageService.getQuizAnswersOrEmpty();
    prevAnswers[page] = { answer: selected, t: timePassed };
    storageService.setQuizAnswers(prevAnswers);
    const user = storageService.getParticipant();

    if (questionData.isLast) {
      return httpsCallable(
        getFunctions(),
        "submitQuiz"
      )({ quizId: uuid, answers: prevAnswers, user }).finally(() => {
        navigate(`/quiz/${uuid}/end`);
        storageService.clearQuiz();
        return;
      });
    }
    const nextPage = parseInt(page, 10) + 1;
    navigate(`/quiz/${uuid}/page/${nextPage}`);
  };

  return (
    <QuizQuestionShared
      questionData={questionData}
      selected={selected}
      handleSelect={handleSelect}
      handleNextQuestion={handleNextQuestion}
      bgPhotoUrl={bgPhotoUrl}
    />
  );
};
