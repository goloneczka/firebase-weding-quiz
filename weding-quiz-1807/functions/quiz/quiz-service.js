import { HttpsError } from "firebase-functions/https";
import { admin } from "../firebase.js";
import { getFirestore, collection, doc, query, where, getDocs } from "firebase/firestore";

export const db = admin.firestore();

export const getQuizById = async (req) => {
  if (!req.auth || !req.auth.uid) {
    throw new HttpsError("failed-precondition", "The function must be called while authenticated.");
  }

  const docId = req.data;
  console.log("req: ", req.auth);
  if (!docId) {
    return { error: "Missing document ID (use ?id=DOC_ID)" };
  }

  const docRef = db.collection("quizz").doc(docId);
  const docSnap = await docRef.get();
  if (!docSnap.exists) {
    return { error: "Document not found" };
  }

  const docData = docSnap.data();
  if (docData.owner !== req.auth.email) {
    throw new HttpsError("failed-condition", "user must be owner of the quiz");
  }

  return { id: docSnap.id, ...docSnap.data() };
};

export const getQuizzQuestionsById = async (req) => {
  if (!req.auth || !req.auth.uid) {
    throw new HttpsError("failed-precondition", "The function must be called while authenticated.");
  }

  const quizzRef = db.collection("quizz").doc(req.data);

  const questionsRef = db.collection("question").where("quiz", "==", quizzRef);
  const querySnapshot = await questionsRef.get();

  return querySnapshot.docs.map((doc) => {
    const { quiz, ...rest } = doc.data(); // usuń quiz z wyniku
    return {
      id: doc.id,
      ...rest,
    };
  });
};

export const getQuizQuestionById = async (req) => {
  if (!req.auth || !req.auth.uid) {
    throw new HttpsError("failed-precondition", "The function must be called while authenticated.");
  }

  const docId = req.data.quizId;
  const no = Number(req.data.questionNumber);

  const quizzRef = db.collection("quizz").doc(docId);
  const questionsRef = db.collection("question").where("quiz", "==", quizzRef).where("no", "==", no);
  const querySnapshot = await questionsRef.get();

  const doc = querySnapshot.docs[0];
  const { quiz, ...rest } = doc.data();
  return {
    id: doc.id,
    ...rest,
  };
};
