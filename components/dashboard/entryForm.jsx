import { Stack, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { addDiaryEntry, getUserEntriesCountQuery } from "../../lib/firestore";
import useAuthStore from "../../lib/store/authStore";

const EntryForm = () => {
  const [entry, setEntry] = useState("");
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleEntry = (e) => {
    if (e.target.value.length > 300) {
      setEntry(e.target.value.slice(0, 300));
    } else {
      setEntry(e.target.value);
    }
  };

  const handleSubmitEntry = async () => {
    setLoading(true);
    await addDiaryEntry({
      user: user.email,
      content: entry,
      date: new Date(),
    });

    setEntry("");
    setLoading(false);
  };

  return (
    <Stack alignItems="flex-start">
      <TextField
        multiline
        minRows={2}
        onChange={handleEntry}
        value={entry}
        sx={{ width: 400 }}
        placeholder={user ? "How are you feeling today?" : "Please log in."}
        disabled={user === null || loading}
        helperText={`You have ${300 - entry.length}/300 characters remaining`}
      />
      <Button
        variant="contained"
        disabled={entry.length < 3 || user === null || loading}
        onClick={handleSubmitEntry}
      >
        Post Entry
      </Button>
    </Stack>
  );
};

export default EntryForm;
