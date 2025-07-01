import { User } from "./user";

export interface RefreshToken {
  id: number;
  token: string;
  expiresAt: string | Date;
  user: User;
  createdAt: string | Date;
}
