import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { List } from "@mui/material";
import EntryListItem from "./entryListItem";
import {
  getUserEntriesQuery,
  deleteDiaryEntry,
  updateDiaryEntry,
} from "../../../lib/firestore";
import useAuthStore from "../../../lib/store/authStore";

const EntryList = () => {
  const [entries, setEntries] = useState([]);
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleDeleteEntry = (id) => async () => {
    setLoading(true);
    await deleteDiaryEntry(id);
    setLoading(false);
  };

  const handleEditEntry = async (updatedEntry) => {
    try {
      await updateDiaryEntry(updatedEntry);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!user?.email) return;

    const userEntriesQuery = getUserEntriesQuery(user.email);

    const unsubscribe = onSnapshot(userEntriesQuery, (querySnapshot) => {
      const changes = querySnapshot.docChanges();

      const entriesToAdd = changes.filter((change) => change.type === "added");
      if (entriesToAdd) {
        const newEntries = entriesToAdd.map((change) => ({
          id: change.doc.id,
          ...change.doc.data(),
        }));
        setEntries((prev) => [...newEntries, ...prev]);
      }

      const entriesToRemove = changes.filter(
        (change) => change.type === "removed"
      );
      if (entriesToRemove) {
        const entryIdsToRemove = new Set(
          entriesToRemove.map((change) => change.doc.id)
        );

        setEntries((prev) =>
          prev.filter(
            (previousEntry) => !entryIdsToRemove.has(previousEntry.id)
          )
        );
      }

      /**
       * FIRESTORE EXERCISE 1b
       * TODO: Complete this listener by working with the querySnapshot.
       * Goal: To update the list of items to show with the latest update/edits done to the firestore.
       * Documentation: https://firebase.google.com/docs/firestore/query-data/listen#view_changes_between_snapshots
       * Hint: Copy and modify the above functions.
       */

      // Insert your solution here.
    });

    return () => {
      setEntries([]);
      unsubscribe();
    };
  }, [user]);

  return (
    <List dense>
      {entries.map((entry) => (
        <EntryListItem
          key={entry.id}
          entry={entry}
          handleDeleteEntry={handleDeleteEntry}
          loading={loading}
          handleEditEntry={handleEditEntry}
        />
      ))}
    </List>
  );
};

export default EntryList;
