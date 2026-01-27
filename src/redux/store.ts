import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./features/expenses/expense-slice";
import groupsReducer from "./features/groups/group-slice";
import membersReducer from "./features/members/member-slice";
import userReducer from "./features/user/user-slice";

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
    members: membersReducer,
    expenses: expensesReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
