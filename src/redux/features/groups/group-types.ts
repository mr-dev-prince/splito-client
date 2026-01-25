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

  currentGroupWeeklyActivity: WeeklyActivityResponse | null;
  currentGroupWeeklyActivityLoading: boolean;
  currentGroupWeeklyActivityError: string | null;

  deleteGroupLoading: boolean;
  deleteGroupError: string | null;

  currentGroupUpdating: boolean;
  currentGroupUpdateError: string | null;

  adminGroupSettlements: AdminGroupSettlementResponse[];
  adminGroupSettlementsLoading: boolean;
  adminGroupSettlementsError: string | null;
}

export interface GroupMember {
  name: string;
  email: string | null;
  phone: string | null;
}

export interface WeeklyActivityDay {
  day: string;
  amount: number;
}

export interface WeeklyActivityResponse {
  daily: WeeklyActivityDay[];
}

export interface UpdateGroupNameResponse {
  message: string;
}

export interface GroupSettlement {
  from_member_id: number;
  from_member_name: string;
  to_member_id: number;
  to_member_name: string;
  amount: number;
}

export interface AdminGroupSettlementResponse {
  group_id: number;
  group_name: string;
  total_members: number;
  settlements: GroupSettlement[];
}
