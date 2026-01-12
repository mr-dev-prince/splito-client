import { configureStore } from "@reduxjs/toolkit";
import groupsReducer from "./features/groups/group-slice";

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
