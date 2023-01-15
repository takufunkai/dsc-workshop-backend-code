const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.incrementDiaryEntryCount = functions.firestore
  .document("diaryEntries/{entryId}")
  .onCreate((snap, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const newValue = snap.data();

    // access a particular field as you would any JS property
    const user = newValue.user;
    console.log(user, "added entry");
    const entryCountRef = db.collection("diaryEntriesCount").doc(user);
    return entryCountRef.get().then((doc) => {
      entryCountRef.set({ count: doc.exists ? doc.data().count + 1 : 1 });
    });
  });

exports.decrementDiaryEntryCount = functions.firestore
  .document("diaryEntries/{entryId}")
  .onDelete((snap, context) => {
    const user = snap.data().user;

    console.log(user, "deleted entry");
    const entryCountRef = db.collection("diaryEntriesCount").doc(user);
    return entryCountRef.get().then((doc) => {
      if (!doc.exists) {
        console.error(
          "User's entry count does not exist. This should not happen. Please check the database."
        );
      }
      entryCountRef.set({ count: doc.exists ? doc.data().count - 1 : 0 });
    });
  });
