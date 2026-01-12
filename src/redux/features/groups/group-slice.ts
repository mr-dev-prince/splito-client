// redux/features/groups/groupsSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import type { GroupsState } from "./group-types";
import { createGroup, fetchGroups } from "./group-thunks";

const initialState: GroupsState = {
  list: [],
  loading: false,
  error: null,
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    clearGroupsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchGroups
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      // create group
      .addCase(createGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGroup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create group";
      });
  },
});

export const { clearGroupsError } = groupsSlice.actions;
export default groupsSlice.reducer;
