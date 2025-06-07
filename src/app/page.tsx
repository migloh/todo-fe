"use client";
import { useState, useEffect } from "react";
import { Box, Modal, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import styles from "./page.module.css";
import { Note } from "@/types/note";
import { getNotes } from "@/api/notes";

export default function Home() {
  const [modal, setModal] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);

  const onNoteClick = (note: Note): void => {
    setCurrentNote(note);
    setModal(true);
  };

  const onModalClose = (): void => {
    setModal(false);
    setCurrentNote(null);
  };

  useEffect(() => {
    getNotes()
      .then((notes: Note[]) => {
        setNotes(notes);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }, []);

  return (
    <div className={styles.page} suppressHydrationWarning>
      <header className={styles.header}>
        <div className={styles.title}>
          <h1>Notes</h1>
        </div>
        <div>
          <div onClick={() => setModal(true)} className={styles.add}>
            +
          </div>
        </div>
      </header>
      <hr />
      <main className={styles.main}>
        {notes.length > 0 ? (
          notes.map((note: Note, idx: number) => {
            let updatedAt = new Date(note.updatedAt);
            return (
              <div
                key={idx}
                onClick={() => onNoteClick(note)}
                className={styles.card}
              >
                <h4>{note.title}</h4>
                <p>
                  {updatedAt.getFullYear() +
                    "/" +
                    updatedAt.getMonth() +
                    "/" +
                    updatedAt.getDate()}
                </p>
              </div>
            );
          })
        ) : (
          <div className={styles.noNotes}>
            <h2>No notes available</h2>
            <p>Click the + button to create a new note.</p>
          </div>
        )}
        <Modal
          open={modal}
          onClose={setModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={styles.modal}>
            <div className={styles.modalHeader}>
              <TextField
                id="standard-basic"
                defaultValue={currentNote ? currentNote.title : ""}
                variant="standard"
                placeholder="Note title"
                fullWidth
              />
              <CloseIcon
                className={styles.pointerCursor}
                onClick={onModalClose}
                fontSize="large"
                color="action"
              />
            </div>
            <TextField
              id="standard-multiline-static"
              multiline
              rows={10}
              defaultValue={currentNote ? currentNote.content : ""}
              variant="standard"
              placeholder="Note content"
              fullWidth
            />
            <div className={styles.modalAction}>
              <DeleteIcon
                fontSize="large"
                color="error"
                className={styles.pointerCursor}
              />
              <SaveIcon
                fontSize="large"
                color="primary"
                className={styles.pointerCursor}
              />
            </div>
          </Box>
        </Modal>
      </main>
    </div>
  );
}
