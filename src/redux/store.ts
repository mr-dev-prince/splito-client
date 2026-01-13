import { configureStore } from "@reduxjs/toolkit";
import groupsReducer from "./features/groups/group-slice";
import membersReducer from "./features/members/member-slice";
import expensesReducer from "./features/expenses/expense-slice";

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
    members: membersReducer,
    expenses: expensesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
