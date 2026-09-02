export const storageService = {
  getQuizAnswersOrEmpty() {
    return JSON.parse(sessionStorage.getItem("quizAnswers") || "{}");
  },

  setQuizAnswers(answers) {
    sessionStorage.setItem("quizAnswers", JSON.stringify(answers));
  },

  validateCurrentQuestion(questionNumber) {
    const isUser = !!sessionStorage.getItem("participant");

    const answers = JSON.parse(sessionStorage.getItem("quizAnswers") || "{}");
    const isPreviousAnswer = !!answers[questionNumber - 1];

    return isUser && (isPreviousAnswer || questionNumber == 1);
  },

  setParticipant(name) {
    sessionStorage.setItem("participant", name);
  },

  getParticipant() {
    return sessionStorage.getItem("participant");
  },

  setQuizColors(quizData) {
    sessionStorage.setItem("quizColors", JSON.stringify(quizData));
  },

  getQuizColors() {
    return JSON.parse(sessionStorage.getItem("quizColors") || "{}");
  },

  clearQuiz() {
    sessionStorage.removeItem("quizAnswers");
    sessionStorage.removeItem("participant");
    sessionStorage.removeItem("quizColors");
  },

  getAuthUser() {
    return JSON.parse(sessionStorage.getItem("auth"));
  },

  validateUserAuth() {
    return !!sessionStorage.getItem("auth");
  },

  setUserAuth(user) {
    sessionStorage.setItem("auth", JSON.stringify(user));
  },

  clearUserAuth() {
    sessionStorage.removeItem("auth");
  },
};

export default storageService;
