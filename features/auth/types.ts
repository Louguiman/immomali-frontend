export interface User {
  id: string;
  name: string;
  email: string;
  agency?: {
    id: string;
    name: string;
  };
  roles?: Array<{
    id: number;
    name: string;
    permissions: Array<{
      id: number;
      name: string;
    }>;
  }>;
}

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
