export interface User {
  username: string;
  email: string;
}

export interface LogInUser {
  username: string;
  email: string;
  avatar: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}
