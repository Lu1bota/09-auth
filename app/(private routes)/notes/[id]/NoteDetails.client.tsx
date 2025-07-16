"use client";

import Loader from "@/app/loading";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import css from "./NoteDetails.module.css";
import ErrorMessage from "../filter/[...slug]/error";
import { fetchNoteById } from "@/lib/api/clientApi";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <>
      {isLoading && <Loader />}
      {isError && !note && <ErrorMessage error={error} />}

      {note && (
        <main>
          <div className={css.container}>
            <div className={css.item}>
              <div className={css.header}>
                <h2>{note.title}</h2>
                <button className={css.editBtn}>Edit note</button>
              </div>
              <p className={css.tag}>{String(note.tag)}</p>
              <p className={css.content}>{note.content}</p>
              <p className={css.date}>Created date: {note.createdAt}</p>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
