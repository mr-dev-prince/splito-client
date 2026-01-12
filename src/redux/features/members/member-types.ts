export interface Member {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  is_admin: boolean;
  user_id: number | null;
}

export interface MembersState {
  list: Member[];
  loading: boolean;
  error: string | null;
}
