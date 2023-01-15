import dayjs from "dayjs";
import {
  ListItem,
  IconButton,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

const EditDialog = ({ open, handleClose, entry, handleSubmit }) => {
  const [entryText, setEntryText] = useState(entry.content);
  const [loading, setLoading] = useState(false);

  const _handleSubmit = async () => {
    setLoading(true);
    await handleSubmit(entryText);
    setLoading(false);
    handleClose();
  };

  const _handleClose = () => {
    if (loading) return;
    handleClose();
    setEntryText(entry.content);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Edit Entry</DialogTitle>
      <DialogContent>
        <TextField
          multiline
          minRows={2}
          onChange={(e) => setEntryText(e.target.value)}
          value={entryText}
          sx={{ width: 400 }}
          disabled={loading}
          helperText={`You have ${
            300 - entryText.length
          }/300 characters remaining`}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={_handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={_handleSubmit} disabled={loading}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default function EntryListItem({
  entry,
  handleDeleteEntry,
  handleEditEntry,
  loading,
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const formattedDate = dayjs(entry.date.toDate()).format(
    "MMMM D, YYYY hh:mm A"
  );

  const handleEdit = async (updatedText) => {
    await handleEditEntry({ ...entry, content: updatedText });
  };

  return (
    <>
      <ListItem
        sx={{
          width: "100%",
          overflow: "hidden",
          overflowWrap: "break-word",
          paddingLeft: 0,
        }}
      >
        <ListItemText primary={entry.content} secondary={formattedDate} />
        <div style={{ display: "flex", gap: 10 }}>
          <IconButton
            edge="end"
            onClick={handleDeleteEntry(entry.id)}
            disabled={loading}
          >
            <DeleteForeverIcon color="warning" />
          </IconButton>
          <IconButton
            edge="end"
            onClick={() => setIsEditMode(true)}
            disabled={loading}
          >
            <EditIcon color="success" />
          </IconButton>
        </div>
      </ListItem>

      <EditDialog
        open={isEditMode}
        handleClose={() => setIsEditMode(false)}
        entry={entry}
        handleSubmit={handleEdit}
      />
    </>
  );
}
