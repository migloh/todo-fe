"use client";
import { useState } from "react";
import { Box, Modal, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import styles from "./page.module.css";

export default function Home() {
  const [modal, setModal] = useState<boolean>(false);
  return (
    <div className={styles.page} suppressHydrationWarning>
      <header className={styles.header}>
        <div className={styles.title}>
          <h1>Notes</h1>
        </div>
        <div>
          <div className={styles.add}>+</div>
        </div>
      </header>
      <hr />
      <main className={styles.main}>
        <div onClick={() => setModal(true)} className={styles.card}>
          <h4>Note title</h4>
          <p>Date</p>
        </div>
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
                defaultValue="Title"
                variant="standard"
                fullWidth
              />
              <CloseIcon
                className={styles.pointerCursor}
                onClick={() => setModal(false)}
                fontSize="large"
                color="action"
              />
            </div>
            <TextField
              id="standard-multiline-static"
              multiline
              rows={10}
              defaultValue="Default Value"
              variant="standard"
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
