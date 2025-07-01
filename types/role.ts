// Frontend Role interface aligned with backend entity
import { Permission } from "./permission";
import { User } from "./user";

export interface Role {
  id: number;
  name: string;
  users: User[];
  permissions: Permission[];
}
