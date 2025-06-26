export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  img?: string;
  role: "admin" | "agent" | "tenant";
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
