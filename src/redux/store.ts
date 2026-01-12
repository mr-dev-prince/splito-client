import { configureStore } from "@reduxjs/toolkit";
import groupsReducer from "./features/groups/group-slice";
import membersReducer from "./features/members/member-slice";

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
    members: membersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
