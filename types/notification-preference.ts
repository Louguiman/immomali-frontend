// Frontend NotificationPreference interface aligned with backend entity
import { User } from "./user";

export interface NotificationPreference {
  id: string;
  user: User;
  receiveWebsocket: boolean;
  receiveEmail: boolean;
  receiveSMS: boolean;
}
