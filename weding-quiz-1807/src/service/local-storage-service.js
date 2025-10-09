export const storageService = {
  // answers stored as object: { "1": { answer: 0, t: 3.2 }, "2": {...} }
  getQuizAnswersOrEmpty() {
    return JSON.parse(localStorage.getItem("quizAnswers") || "{}");
  },

  setQuizAnswers(answers) {
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
  },

  validateCurrentQuestion(questionNumber) {
    const isUser = !!localStorage.getItem("participant");

    const answers = JSON.parse(localStorage.getItem("quizAnswers") || "{}");
    const isPreviousAnswer = !!answers[questionNumber - 1];

    return isUser && (isPreviousAnswer || questionNumber == 1);
  },

  setParticipant(name) {
    localStorage.setItem("participant", name);
  },

  clearQuiz() {
    localStorage.removeItem("quizAnswers");
    localStorage.removeItem("participant");
  },

  getAuthUser() {
    return JSON.parse(localStorage.getItem("auth"));
  },

  validateUserAuth() {
    return !!localStorage.getItem("auth");
  },

  setUserAuth(user) {
    localStorage.setItem("auth", JSON.stringify(user));
  },

  clearUserAuth() {
    localStorage.removeItem("auth");
  },
};

export default storageService;
