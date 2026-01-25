import {
  createExpense,
  deleteExpense,
  fetchExpenses,
  fetchMyExpenses,
} from "./expense-thunk";

import type { ExpensesState } from "./expense-type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ExpensesState = {
  list: [],
  loading: false,
  error: null,
  myExpenses: [],
  myExpensesLoading: false,
  myExpensesError: null,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    clearExpensesError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchExpenses
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      // createExpense
      .addCase(createExpense.pending, (state) => {
        state.loading = true;
      })
      .addCase(createExpense.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create expense";
      })

      // deleteExpense
      .addCase(deleteExpense.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteExpense.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        console.log("delete-expense -> ", action.payload);
        state.loading = false;
        state.error = "Failed to delete expense";
      })

      // fetch my expenses
      .addCase(fetchMyExpenses.pending, (state) => {
        state.myExpensesLoading = true;
        state.myExpensesError = null;
      })
      .addCase(fetchMyExpenses.fulfilled, (state, action) => {
        state.myExpensesLoading = false;
        state.myExpenses = action.payload;
      })
      .addCase(fetchMyExpenses.rejected, (state, action) => {
        console.log("fetch-my-expenses -> ", action.payload);
        state.myExpensesLoading = false;
        state.myExpensesError = action.payload ?? "Something went wrong";
      });
  },
});

export const { clearExpensesError } = expenseSlice.actions;
export default expenseSlice.reducer;
