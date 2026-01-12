export interface Group {
  id: number;
  name: string;
  created_by: number;
  memberCount: number;
  balance: number;
  isAdmin: boolean;
  createdAt: string;
}

export interface GroupsState {
  list: Group[];
  loading: boolean;
  error: string | null;
}
