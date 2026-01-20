export type SplitStrategy = "equal" | "percentage" | "exact";

export interface ExpenseType {
  id: number;
  title: string;
  amount: number;
  group_id: number;
  paid_by: number;
  strategy: SplitStrategy;
  my_share: number;
  is_deleted: boolean;
  created_at: string;
  payer_name: string;
}

export interface ExpensesState {
  list: ExpenseType[];
  loading: boolean;
  error: string | null;
}

export interface ExpenseSplitInput {
  member_id: number;
  amount: number;
}

export interface CreateExpensePayload {
  title: string;
  amount: number;
  strategy: SplitStrategy;
  splits: ExpenseSplitInput[];
}

export interface DeleteExpensePayload {
  expenseId: number;
  groupId: number;
}
