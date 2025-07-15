import { FetchNotesValues, Note } from "@/types/note";
import { nextServer } from "./api";
import { cookies } from "next/headers";
import { ParamsTypes } from "./clientApi";
import { LogInUser } from "@/types/user";

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
        Cookie: cookieStore.toString(),
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function serverSession() {
  try {
    const cookieStore = await cookies();
    const res = await nextServer.get("/auth/session", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return res;
  } catch (error) {
    throw error;
  }
}

export async function getServerMe(): Promise<LogInUser> {
  try {
    const cookieStore = await cookies();
    const res = await nextServer.get("/users/me", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}
