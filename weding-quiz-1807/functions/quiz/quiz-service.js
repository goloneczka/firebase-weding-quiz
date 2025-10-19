import { HttpsError } from "firebase-functions/https";
import { admin } from "../firebase.js";

const db = admin.firestore();

const toDate = (ts) => {
  if (!ts) return null;
  if (typeof ts.toDate === "function") return ts.toDate();
  if (ts._seconds != null) {
    const seconds = Number(ts._seconds) || 0;
    const nanos = Number(ts._nanoseconds) || 0;
    return new Date(seconds * 1000 + Math.floor(nanos / 1e6));
  }
  // if it's a plain number assume milliseconds
  if (typeof ts === "number") return new Date(ts);
  return null;
};

export const getQuizById = async (req) => {
  const docId = req.data;
  if (!docId) {
    return { error: "Missing document ID (use ?id=DOC_ID)" };
  }

  const docRef = db.collection("quizz").doc(docId);
  const docSnap = await docRef.get();
  if (!docSnap.exists) {
    return { error: "Document not found" };
  }

  const quizData = docSnap.data();
  const start = toDate(quizData.startTime);
  const end = toDate(quizData.endTime);
  const now = new Date();
  if (!(req.auth && req.auth.token.email === quizData.owner) && (!start || !end || now < start || now > end)) {
    throw new HttpsError("failed-precondition", "The function must be called while authenticated or during the quiz active time window.");
  }

  return { id: docSnap.id, ...quizData };
};

export const getQuizByOwner = async (req) => {
  if (!req.auth || !req.auth.uid) {
    throw new HttpsError("failed-precondition", "The function must be called while authenticated.");
  }

  const ownerEmail = req.data;
  if (!ownerEmail) {
    return { error: "Missing document ID (use ?id=DOC_ID)" };
  }

  const quizRef = db.collection("quizz").where("owner", "==", ownerEmail);
  const querySnap = await quizRef.get();
  if (querySnap.empty) {
    return { error: "Document not found" };
  }

  // If you expect only one quiz per owner, just take the first doc
  const quizSnap = querySnap.docs[0];
  const quizData = quizSnap.data();

  console.log("Quiz data:", req.auth.token.email, quizData.owner);
  if (quizData.owner !== req.auth.token.email) {
    throw new HttpsError("failed-condition", "user must be owner of the quiz");
  }

  const answersSnap = await db.collection("quiz_results").where("quiz", "==", quizSnap.ref).get();
  const answersData = answersSnap.docs.map((doc) => {
    const { quiz, ...rest } = doc.data();
    return { id: doc.id, ...rest };
  });

  return { quiz: { id: quizSnap.id, ...quizData }, answers: answersData };
};

export const getQuizQuestionById = async (req) => {
  const docId = req.data.quizId;
  const no = Number(req.data.questionNumber);

  const quizzRef = db.collection("quizz").doc(docId);
  const questionsRef = db.collection("question").where("quiz", "==", quizzRef).where("no", "==", no);
  const querySnapshot = await questionsRef.get();

  const docQuizSnap = await quizzRef.get();
  const quizData = docQuizSnap.data();
  const start = toDate(quizData.startTime);
  const end = toDate(quizData.endTime);
  const now = new Date();
  if (!(req.auth && req.auth.token.email === quizData.owner) && (!start || !end || now < start || now > end)) {
    throw new HttpsError("failed-precondition", "The function must be called while authenticated or during the quiz active time window.");
  }
  const doc = querySnapshot.docs[0];
  const { quiz, ...rest } = doc.data();
  return {
    id: doc.id,
    ...rest,
  };
};

export const submitQuiz = async (req) => {
  const docId = req.data.quizId;
  const answers = req.data.answers;
  let points = 0;
  let totalTime = 0;

  const quizzRef = db.collection("quizz").doc(docId);
  const questionsRef = db.collection("question").where("quiz", "==", quizzRef);
  const querySnapshot = await questionsRef.get();

  querySnapshot.docs.forEach((question) => {
    const qData = question.data();
    const userAnswer = answers[qData.no];
    points += userAnswer?.answer === qData.correctAnswer ? 1 : 0;
    totalTime += userAnswer?.t || 0;
  });

  await db.collection("quiz_results").add({
    quiz: quizzRef,
    points,
    totalTime,
    participant: req.data.user,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  return;
};
