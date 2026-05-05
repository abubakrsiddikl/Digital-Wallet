export interface IAgentRequest {
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED"; 
  reviewNote: string | null;
  nidNumber: string;
  businessName: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}