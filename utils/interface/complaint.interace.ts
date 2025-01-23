export interface Complaint {
  id: number;
  tenantId: number;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "resolved";
  createdAt: string;
}
  