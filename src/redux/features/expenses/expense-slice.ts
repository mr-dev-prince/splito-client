import { createSlice } from "@reduxjs/toolkit";
import type { ExpensesState } from "./expense-type";
import { createExpense, fetchExpenses } from "./expense-thunk";

const initialState: ExpensesState = {
  list: [],
  loading: false,
  error: null,
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
      });
  },
});

export const { clearExpensesError } = expenseSlice.actions;
export default expenseSlice.reducer;
