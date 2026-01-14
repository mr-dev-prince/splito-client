import { createSlice } from "@reduxjs/toolkit";
import { fetchGroupMembers } from "./member-thunk";
import type { MembersState } from "./member-types";

const initialState: MembersState = {
  list: [],
  loading: false,
  error: null,
};

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    clearMembersError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchGroupMembers
      .addCase(fetchGroupMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroupMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload as typeof state.list;
      })
      .addCase(fetchGroupMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export const { clearMembersError } = membersSlice.actions;
export default membersSlice.reducer;
