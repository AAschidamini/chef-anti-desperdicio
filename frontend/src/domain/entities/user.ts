export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "staff";
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthSession {
  user: User;
  token: string;
}
