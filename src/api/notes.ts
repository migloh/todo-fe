import { Note, NoteCreation } from "@/types/note";

const BASE_URL = process.env.API_BASE_URL || "http://localhost:8080";

export async function getNotes(): Promise<Note[]> {
  const res = await fetch(`${BASE_URL}/api/v1/notes`);
  if (!res.ok) throw new Error("Error while fetching notes");
  return res.json();
}

export async function createNote(note: NoteCreation) {
  const res = await fetch(`${BASE_URL}/api/v1/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Error when posting note");
  return res.json();
}
