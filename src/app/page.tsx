"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { Box, Modal, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import styles from "./page.module.css";
import { Note, NoteCreation } from "@/types/note";
import { getNotes, createNote } from "@/api/notes";
import { defaultNote } from "@/constants/default";

export default function Home() {
  const [modal, setModal] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note>(defaultNote);
  const [newNote, setNewNote] = useState<boolean>(false);

  const onNoteClick = (note: Note): void => {
    setCurrentNote(note);
    setModal(true);
  };

  const onModalClose = (): void => {
    setModal(false);
    setCurrentNote(defaultNote);
  };

  const onNewNoteClick = (): void => {
    setCurrentNote(defaultNote);
    setNewNote(true);
    setModal(true);
  };

  const onSaveNote = (): void => {
    if (newNote) {
      if (currentNote.title.length == 0) alert("Title cannot be empty");
      let newNoteData: NoteCreation = {
        title: currentNote.title || "",
        content: currentNote.content || "",
      };

      createNote(newNoteData)
        .then((note: Note) => {
          setNotes((prevNotes) => [...prevNotes, note]);
          setModal(false);
        })
        .catch((error) => {
          console.error("Error creating note:", error);
          alert("Error creating note");
        });
      return;
    }
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
          <div onClick={onNewNoteClick} className={styles.add}>
            +
          </div>
        </div>
      </header>
      <hr />
      <main className={styles.main}>
        {notes.length > 0 ? (
          notes.map((note: Note, idx: number) => {
            let updatedAt = new Date(note.updatedAt!!);
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
                onChange={(
                  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) =>
                  setCurrentNote({
                    ...currentNote,
                    title: e.target.value,
                  })
                }
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
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) =>
                setCurrentNote({
                  ...currentNote,
                  content: e.target.value,
                })
              }
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
                onClick={onSaveNote}
              />
            </div>
          </Box>
        </Modal>
      </main>
    </div>
  );
}
