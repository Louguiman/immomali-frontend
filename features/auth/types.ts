import { User } from "@/types/user";

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

export interface LoginPayload {
  user: User;
  accessToken: string;
}

export interface RefreshTokenPayload {
  accessToken: string;
}
