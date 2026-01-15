export interface Group {
  id: number;
  name: string;
  created_by: number;
  createdAt: string;
  my_balance: number;
  member_count: number;
}

export interface GroupDetails extends Group {
  total_spent: number;
  my_balance: number;
  member_count: number;
  is_admin: boolean;
}

export interface GroupsState {
  list: Group[];
  loading: boolean;
  error: string | null;
  currentGroup: GroupDetails | null;
  currentGroupLoading: boolean;
  currentGroupError: string | null;
  deleteGroupLoading: boolean;
  deleteGroupError: string | null;
}

export interface GroupMember {
  name: string;
  email: string | null;
  phone: string | null;
}
