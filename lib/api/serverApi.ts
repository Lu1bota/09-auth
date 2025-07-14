import { FetchNotesValues, Note } from "@/types/note";
import { nextServer } from "./api";
import { cookies } from "next/headers";
import { ParamsTypes } from "./clientApi";

export async function fetchServerNotes(
  search: string,
  page: number,
  tag: string | undefined
): Promise<FetchNotesValues | undefined> {
  try {
    const cookieStore = await cookies();
    const perPage = 12;
    const params: ParamsTypes = {
      tag,
      page,
      perPage,
    };

    if (search?.trim()) {
      params.search = search;
    }
    if (tag?.trim()) {
      params.tag = tag;
    }

    const res = await nextServer.get<FetchNotesValues>("/notes", {
      params,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        Cookie: cookieStore.toString(),
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default async function fetchServerNoteById(
  id: string
): Promise<Note | undefined> {
  try {
    const cookieStore = await cookies();
    const res = await nextServer.get<Note>(`notes/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        Cookie: cookieStore.toString(),
      },
    });
    return res.data;
  } catch (error) {
    // toast.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
}
