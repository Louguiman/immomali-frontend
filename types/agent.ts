export interface Agent {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  isActive: boolean;
  agencyId?: string;
  // Add other agent properties as needed
}

export interface AgentFormData {
  name: string;
  email: string;
  phoneNumber?: string;
  isActive: string;
  password?: string; // Optional for updates, required for new agents
  // Add other form fields as needed
}

export interface AuthState {
  user: {
    id: string;
    email: string;
    agency?: {
      id: string;
      name: string;
      // Add other agency properties as needed
    };
    // Add other user properties as needed
  } | null;
}
