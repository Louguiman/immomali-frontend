export interface User {
  id: string;
  name: string;
  email: string;
  img?: string;
  phoneNumber?: string;
  agency?: {
    id: string;
    name: string;
  };
  roles?: Array<{
    id: string;
    name: string;
    permissions: Array<{
      id: string;
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
