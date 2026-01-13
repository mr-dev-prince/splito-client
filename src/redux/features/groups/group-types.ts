export interface Group {
  id: number;
  name: string;
  created_by: number;
  memberCount: number;
  balance: number;
  isAdmin: boolean;
  createdAt: string;
}

export interface GroupDetails extends Group {
  total_spent: number;
  my_balance: number;
  member_count: number;
}

export interface GroupsState {
  list: Group[];
  loading: boolean;
  error: string | null;
  currentGroup: GroupDetails | null;
  currentGroupLoading: boolean;
  currentGroupError: string | null;
}

export interface GroupMember {
  name: string;
  email: string | null;
  phone: string | null;
}
