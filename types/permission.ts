// Frontend Permission interface aligned with backend entity
import { Role } from "./role";

export interface Permission {
  id: number;
  name: string;
  roles: Role[];
}
