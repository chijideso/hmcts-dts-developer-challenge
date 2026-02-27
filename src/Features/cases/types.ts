export type CaseStatus = 'New' | 'In Progress' | 'Closed';

export interface HMCTSCase {
  id: string;
  title: string;
  description: string;
  status: CaseStatus;
  dueDate: string; // ISO String
  createdAt: string;
}

export interface CasesState {
  items: HMCTSCase[];
  loading: boolean;
  error: string | null;
}