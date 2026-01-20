import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  type CreateExpensePayload,
  type DeleteExpensePayload,
  type ExpenseType,
} from "./expense-type";
import { api } from "@/lib/api";
import { fetchGroupData } from "../groups/group-thunks";

export const fetchExpenses = createAsyncThunk<
  ExpenseType[],
  { groupId: number },
  { rejectValue: string | undefined }
>("expenses/fetchExpenses", async ({ groupId }, { rejectWithValue }) => {
  try {
    const res = await api.get(`/expenses/${groupId}/all`);
    return res.data as ExpenseType[];
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    }
    return rejectWithValue(message);
  }
});

export const createExpense = createAsyncThunk<
  ExpenseType,
  {
    groupId: number;
    data: CreateExpensePayload;
  },
  { rejectValue: string }
>(
  "expenses/createExpense",
  async ({ groupId, data }, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post(`/expenses/${groupId}/add`, data);
      dispatch(fetchExpenses({ groupId }));
      return res.data;
    } catch (err) {
      let message = "An unexpected error occurred.";
      if (err instanceof Error) {
        message = err.message;
      }
      return rejectWithValue(message);
    }
  },
);

export const deleteExpense = createAsyncThunk<
  DeleteExpensePayload,
  DeleteExpensePayload,
  { rejectValue: string }
>(
  "expenses/deleteExpense",
  async ({ expenseId, groupId }, { dispatch, rejectWithValue }) => {
    try {
      await api.delete(`/expenses/${expenseId}`);
      dispatch(fetchExpenses({ groupId }));
      dispatch(fetchGroupData({ groupId }));
      return { expenseId, groupId };
    } catch (err) {
      let message = "An unexpected error occurred.";
      if (err instanceof Error) {
        message = err.message;
      }
      return rejectWithValue(message);
    }
  },
);
