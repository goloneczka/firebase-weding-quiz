import storageService from "../../service/local-storage-service";
import { QuizQuestionLogged } from "./admin/quiz-question";
import { QuizStartLogged } from "./admin/quiz-start";
import { QuizQuestionNotLogged } from "./notauthorized/quiz-question";
import { QuizStartNotLogged } from "./notauthorized/quiz-start";

const isLoggedIn = storageService.validateUserAuth();

export const QuizStartContainer = () => {
  return <>{isLoggedIn ? <QuizStartLogged /> : <QuizStartNotLogged />}</>;
};

export const QuizQuestionContainer = () => {
  return <>{isLoggedIn ? <QuizQuestionLogged /> : <QuizQuestionNotLogged />}</>;
};
