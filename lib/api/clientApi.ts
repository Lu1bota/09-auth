// import axios from "axios";
import type {
  CreateNoteValues,
  FetchNotesValues,
  Note,
} from "../../types/note";
import { toast } from "react-hot-toast";
import { AuthRequest, LogInUser, User } from "@/types/user";
import { nextServer } from "./api";

// axios.defaults.baseURL = "https://notehub-public.goit.study/api";

// export const nextServer = axios.create({
//   baseURL: "http://localhost:3000/api",
//   withCredentials: true,
// });

export interface ParamsTypes {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

export async function fetchNotes(
  search: string,
  page: number,
  tag: string | undefined
): Promise<FetchNotesValues | undefined> {
  try {
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
    });
    return res.data;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
}

export async function createNote({
  title,
  content,
  tag,
}: CreateNoteValues): Promise<Note | undefined> {
  try {
    const params: CreateNoteValues = {
      title,
      content,
      tag,
    };

    const res = await nextServer.post<Note>("/notes", params);
    return res.data;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
  }
}

export async function deleteNote(id: string): Promise<Note | undefined> {
  try {
    const res = await nextServer.delete<Note>(`/notes/${id}`);
    return res.data;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
  }
}

export default async function fetchNoteById(
  id: string
): Promise<Note | undefined> {
  try {
    const res = await nextServer.get<Note>(`notes/${id}`);
    return res.data;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
}

export async function register(data: AuthRequest) {
  const response = await nextServer.post<User>("/auth/register", data);
  return response.data;
}

export async function login(data: AuthRequest) {
  const response = await nextServer.post<LogInUser>("/auth/login", data);
  return response.data;
}

export async function logout() {
  try {
    await nextServer.post("/auth/logout");
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
}

export async function session() {
  try {
    await nextServer.get("/auth/session");
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
}

export async function getMe(): Promise<LogInUser> {
  try {
    const res = await nextServer.get("/users/me");
    return res.data;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
}

export async function updateMe(payload: User) {
  try {
    const res = await nextServer.patch<LogInUser>("/users/me", payload);
    return res.data;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
}
