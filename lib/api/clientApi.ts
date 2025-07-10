import { api } from "@/app/api/api";
import { LogInUser, User } from "@/types/user";

export async function register(data: User) {
  const response = await api.post<User>("/auth/register", data);
  return response.data;
}

export async function login(data: User) {
  const response = await api.post<LogInUser>("/auth/login", data);
  return response.data;
}
