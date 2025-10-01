/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { setGlobalOptions } = require("firebase-functions");
const { onRequest, onCall } = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

let db = null;

if (admin.apps.length === 0) {
  admin.initializeApp();
  db = admin.firestore();
}
// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onCall(async (req) => {
  if (!req.auth || !req.auth.uid) {
    throw new HttpsError("failed-precondition", "The function must be called while authenticated.");
  }

  const docId = "RSCBdTq8trDPGhDGcipe";
  if (!docId) {
    return { error: "Missing document ID (use ?id=DOC_ID)" };
  }

  // Reference your collection, e.g., "users"
  const docRef = db.collection("quizz").doc(docId);
  const docSnap = await docRef.get();

  if (!docSnap.exists) {
    return { error: "Document not found" };
  }

  return { id: docSnap.id, quiz: docSnap.data() };
});
