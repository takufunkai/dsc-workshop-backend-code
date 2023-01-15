import { db } from "./firebase";
import {
  addDoc,
  updateDoc,
  collection,
  doc,
  query,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";

export const addDiaryEntry = (entry) => {
  return addDoc(collection(db, "diaryEntries"), entry);
};

export const deleteDiaryEntry = (id) => {
  const diaryEntryRef = doc(db, "diaryEntries", id);
  return deleteDoc(diaryEntryRef);
};

export const updateDiaryEntry = (updatedEntry) => {
  /**
   * FIRESTORE EXERCISE 1a
   * TODO: Complete this function by creating a firestore action here.
   * Goal: To update the entry with id of 'updatedEntry.id' to the new entry text 'updatedEntry.content'
   * Documentation: https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
   */

  // Insert your solution here.
};

export const getUserEntriesQuery = (uid) => {
  return query(
    collection(db, "diaryEntries"),
    where("user", "==", uid),
    orderBy("date", "desc")
  );
};

export const getUserEntriesCountQuery = (uid) => {
  return doc(db, "diaryEntriesCount", uid);
};
